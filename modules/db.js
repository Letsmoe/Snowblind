function stringParser(string) {
	if (string) {
		const IndexStore = {}
		var indices = string.split(",").map(x => x.trim());
		for (const index of indices) {
			var name;
			if (index.startsWith("++")) {
				/**
				 * Auto increment key (++one)
				 */
				name = index.substring(2)
				IndexStore[name] = {
					unique: false
				}
			} else if (index.startsWith("!")) {
				/**
				 * Unique key (!one)
				 */
				name = index.substring(1)
				IndexStore[name] = {
					unique: true
				}
			} else if (index.startsWith("*")) {
				/**
				 * multiEntry key (*one)
				 */
				name = index.substring(1)
				IndexStore[name] = {
					unique: false,
					multiEntry: true
				}
			} else if (index.startsWith("[") && index.endsWith("]")) {
				/**
				 * Compound Index ([one+two])
				 */
				name = index.substring(1, name.length - 1);
				name.split("+");
			} else {
				IndexStore[index] = {
					unique: false
				}
			}
		}
		return IndexStore
	} else {
		return string
	}
}

class SnowblindDB {
	constructor(dbName) {
		this.dbName = dbName;
		this.Database = undefined;
		this._events = new EventTarget();
	}

	version(versionNumber = 1) {
		const callbackMethods = {
			stores: (object, db) => {
				/**
				 * Takes key-value pairs and creates a table from those
				 */
				for (const tableName in object) {
					var value = object[tableName]
					if (value === null) {
						db.deleteObjectStore(tableName);
					} else if (typeof value !== "undefined") {
						value = stringParser(value)
						var inDatabase = db.objectStoreNames.contains(tableName);
						if (value) {
							if (!inDatabase) {
								var objectStore = db.createObjectStore(tableName);
								for (const column in value) {
									objectStore.createIndex(column, column, value[column]);
								}
							}
						} else if (value === null && inDatabase) {
							db.deleteObjectStore(tableName)
						}
					} else {
						console.error("Removing a table must be specified with a 'null' value, undefined was passed.")
					}
				}
			},
			upgrade: (func, db) => {
				func(db);
			}
		}
		const capture = this._chainingCapture(callbackMethods);
		this.open(versionNumber, {
			onUpdate: (db) => {
				/**
				 * Run all methods that might be used in an update event
				 */
				capture.fire(db)
			}
		})
		return capture.params
	}

	on(listener, callback) {
		this._events.addEventListener(listener, callback);
	}

	open(versionNumber = 1, obj = {}) {
		obj = Object.assign({
			onSuccess: () => {},
			onUpdate: () => {},
			onError: () => {},
		}, obj);
		if (this.Database) {
			/**
			 * Database connection has been established before, close now.
			 */
			this.Database.close()
		}

		const DBOpenRequest = indexedDB.open(this.dbName, versionNumber);

		DBOpenRequest.onerror = DBOpenRequest.onblocked = (err) => {
			obj.onError(err)
		}

		DBOpenRequest.onsuccess = (ev) => {
			/**
			 * Assign database object and increment version number for next call.
			 */
			this.Database = ev.target.result;
			obj.onSuccess(this.Database, ev)
			this._registerListeners(this.Database);
		}

		DBOpenRequest.onupgradeneeded = (ev) => {
			/**
			 * Re-assign the database object
			 */
			this.Database = ev.target.result;
			obj.onUpdate(ev.target.result, ev)
		}
	}

	_registerListeners(db, connectEvent) {
		this._events.dispatchEvent(new CustomEvent("didconnect", {
			detail: {
				originalEvent: connectEvent
			}
		}))
		db.onversionchange = (ev) => {
			var result = ev.target.result;
			if (result) {
				this._events.dispatchEvent(new CustomEvent("didupgrade", {
					detail: {
						originalEvent: ev,
						newVersion: result && result.version
					}
				}))
			} else {
				/**
				 * Database was deleted
				 */
				this._events.dispatchEvent(new CustomEvent("didremove", {
					detail: {
						originalEvent: ev
					}
				}))
			}
		}
	}

	_chainingCapture(callbackMethods, callback) {
		const parameterStore = []
		const captureParameters = new Proxy({}, {
			get: (obj, key) => {
				if (["then", "catch", "finally"].indexOf(key) !== -1) {
					return (f) => {
						promise[key](f)
					};
				}
				return (...args) => {
					parameterStore.push({keyName: key, arguments: args});
					return captureParameters
				}
			},
			set: () => false,
		})

		var promiseResolve;
		const promise = new Promise((resolve) => {
			promiseResolve = resolve;
		})

		const fireAll = (...parameters) => {
			for (const requested of parameterStore) {
				var key = requested.keyName;
				var args = requested.arguments
				var func = callbackMethods[key];
				if (typeof func === 'function') {
					var result = func(...args, ...parameters)
					if (callback) {
						callback(result)
					}
				}
			}
		}

		return {params: captureParameters, fire: fireAll, resolve: (...args) => {
			promiseResolve(...args);
		}}
	}

	startFilterTransaction(objectStore, filterFunction = () => {return true}, deleteInOperations) {
		/**
		 * Takes a filterFunction and returns all items in the searched table that match the filter.
		 */
		return new Promise((resolve, reject) => {
			if (objectStore instanceof IDBObjectStore) {
				const request = objectStore.getAll();
				if (deleteInOperations) {
					/**
					 * Merge with keys to prepare for deletion
					 */
					request.onsuccess = (ev) => {
						resultArray = ev.target.result;
						tryFinish()
					}
					const keyRequest = objectStore.getAllKeys();
					var resultArray, keyArray;
					
					keyRequest.onsuccess = (ev) => {
						keyArray = ev.target.result;
						tryFinish()
					}

					const tryFinish = () => {
						if (resultArray && keyArray) {
							for (const i in keyArray) {
								resultArray[i].__keyValue = keyArray[i];
							}
							resolve(resultArray.filter(filterFunction));
						}
					}
				} else {
					request.onsuccess = (ev) => {
						resolve(ev.target.result.filter(filterFunction));
					}
				}
			} else {
				reject(new Error("Table is not of type IDBObjectStore, exiting."))
			}
		})
	}

	table(tableName) {
		const searchTree = []

		const callbackMethods = {
			add: (data, key = undefined, objectStore) => {
				objectStore = objectStore instanceof IDBObjectStore ? objectStore : key;
				callbackMethods.bulkAdd([data], [key], objectStore)
			},
			bulkAdd: (data, keys = [], objectStore) => {
				objectStore = objectStore instanceof IDBObjectStore ? objectStore : keys;
				for (let i = 0; i < data.length; i++) {
					objectStore.put(data[i], keys[i]);
				}
				this._events.dispatchEvent(new CustomEvent("didinsert", {
					detail: {
						tableName: objectStore.name,
						arrData: data,
						arrKeys: keys,
					}
				}))
			},
			modify: (func, keyGenerator, store) => ({
				runMethod: (arr) => {
					store = store instanceof IDBObjectStore ? store : keyGenerator;
					var newArray = arr.map(func)
					var keys;
					if (typeof keyGenerator === "function") {
						keys = arr.map(keyGenerator)
					}
					callbackMethods.bulkAdd(newArray, keys, store)
					return arr
				}
			}),
			delete: (objectStore) => ({
				isDelete: true,
				runMethod: (arr) => {
					for (const i of arr) {
						var keyValue = i.__keyValue;
						objectStore.delete(keyValue);
					}
					return arr
				}
			}),
			where: (name) => ({
				searchTerm: name,
			}),
			equals: (value) => ({
				searchMethod: (itemValue) => {
					return (itemValue == value)
				}
			}),
			equalsExact: (value) => ({
				searchMethod: (itemValue) => {
					return (itemValue === value)
				}
			}),
			equalsIgnoreCase: (value) => ({
				searchMethod: (itemValue) => {
					return (itemValue.toLowerCase() == value.toLowerCase())
				}
			}),
			and: (name) => ({
				searchTerm: name,
			}),
			has: (value) => ({
				searchMethod: (itemValue) => {
					return Array.isArray(itemValue) && itemValue.indexOf(value) !== -1;
				},
			}),
			startsWith: (value) => ({
				searchMethod: (itemValue) => {
					return itemValue.toString().startsWith(value);
				},
			}),
			endsWith: (value) => ({
				searchMethod: (itemValue) => {
					return itemValue.toString().endsWith(value);
				},
			}),
			sortBy: (term) => ({
				runMethod: (arr) => {
					return arr.sort((a,b) => {
						a = a[term];
						b = b[term];
						a = typeof a === 'string' ? a.toLowerCase() : a;
						b = typeof b === 'string' ? b.toLowerCase() : b;
						var compareStrings = typeof a === 'string';
						if (compareStrings) {
							if (a < b) {
								return -1;
							}
							if (a > b) {
								return 1;
							}
							// Both have the same value
							return 0;
						} else {
							return a - b
						}
					});
				},
			}),
			offset: (numOffset) => ({
				runMethod: (arr) => {
					return arr.slice(numOffset);
				},
			}),
			offsetBetween: (start, end) => ({
				runMethod: (arr) => {
					return arr.slice(start, end);
				},
			}),
			first: (callback) => ({
				runMethod: (arr) => {
					return callback(arr[0]);
				},
			}),
			reverse: () => ({
				runMethod: (arr) => {
					return arr.reverse();
				},
			}),
			sharesSubstring: (substr) => ({
				searchMethod: (val) => {
					return val.includes(substr);
				},
			}),
			customFilter: (filterFunction) => ({
				runMethod: filterFunction,
			}),
			customOperation: (operation) => ({
				searchMethod: operation,
			})
		}
		const capture = this._chainingCapture(callbackMethods, (res) => {
			if (!(res instanceof Promise)) {
				searchTree.push(res)
			}
		});
		/**
		 * Open a table and allow for insertion and retrieval
		 */
		this.open(1, {
			onSuccess: (db) => {
				var objectStore = db.transaction(tableName, "readwrite").objectStore(tableName)
				capture.fire(objectStore)
				/**
				 * Check if a filter request was emitted
				 */
				if (searchTree.length > 0) {
					/**
					 * Merge every two items of searchTree into Array, filters consist of two items ((where id) - 1 (= 5) - 2)
					 */
					const searchStack = []
					const stashedFunctions = []
					var deleteInOperations = false;
					for (let i = 0; i < searchTree.length; i++) {
						const curr = searchTree[i];
						const next = searchTree[i+1];
						if (curr && curr.hasOwnProperty("isDelete")) {
							deleteInOperations = true
						}
						if (curr && curr.hasOwnProperty("runMethod")) { // Filter function (executed after search finished)
							/**
							 * Assume it is a function that doesn't check for validity (like sortBy)
							 */
							stashedFunctions.push({method: curr.runMethod})
						} else if (curr) {
							i++
							searchStack.push([curr,next])
						}
					}
					var filteredResults = this.startFilterTransaction(objectStore, (x) => {
						var isTrue = false;
						for (let i = 0; i < searchStack.length; i++) {
							const arrFilter = searchStack[i];
							const name = arrFilter[0].searchTerm;
							if (arrFilter[1]) {
								if (x.hasOwnProperty(name)) {
									const itemValue = x[name];
									/**
									 * Validate the truthiness of the nodes value.
									 */
									isTrue = arrFilter[1].searchMethod(itemValue);
								} else {
									return false;
								}
							}
						}
						return isTrue;
					}, deleteInOperations)
					filteredResults.then((results) => {
						for (const func of stashedFunctions) {
							results = func.method(results);
						}
						this._events.dispatchEvent(new CustomEvent("didretrieve", {
							detail: {
								tableName: objectStore.name,
								getOperations: searchStack,
								resultArray: results,
								filterFunctions: stashedFunctions,
							}
						}))
						capture.resolve(results);
					})
				}
			}
		});

		return capture.params
	}
}

/* var db = new SnowblindDB("WhiskeyDB");

db.version(1).stores({
	whiskeyStore: "id, !name, *tags"
})

/* db.table("whiskeyStore").bulkAdd([
	{"id": 1, "name": "Gin", "tags": ["Sweet"]},
	{"id": 2, "name": "Tonic", "tags": ["Sweet"]},
	{"id": 3, "name": "Water", "tags": ["Sour"]},
	{"id": 4, "name": "Beer", "tags": ["asd"]},
	{"id": 5, "name": "Alphel", "tags": ["Sweet"]}
], ["id1","id2","id3","id4", "id5"]) */

/* db.table("whiskeyStore").bulkAdd(Array.from({length: 10000}, (_,i) => {
	return {"id": i, "name": (Math.random() + 1).toString(36).substring(7), "tags": ["Sweet"]}
}), Array.from({length: 10000}, (_,i) => {
	return i.toString()
}))  */

/**
 * .modify((x) => {
	x.name = Math.random()
	return x
}, () => {
	return Math.random()
})
 
let time1 = performance.now()
db.table("whiskeyStore").where("name").startsWith("a").delete().then(result => {
	console.log(result);
	console.log(performance.now() - time1)
}); */