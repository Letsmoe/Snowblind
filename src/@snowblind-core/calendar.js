window.Calendar = class Calendar extends Snowblind.Component {
	__init__() {
		var dt = new Date();
		this.state = {
			day: dt.getDate(),
			month: dt.getMonth(),
			year: dt.getFullYear()
		}
	}

	selectDay(day) {
		this.mergeState({
			day: day
		})
	}


	setMonth(month) {
		if ((month == 11) && this.state.month == 0) {
			this.state.year -= 1
		} else if ((month == 0) && this.state.month == 11) {
			this.state.year += 1
		}
		this.mergeState({
			month: month
		})
	}

	render() {
		var month = this.state.month
		var year = this.state.year
		const CurrDate = new Date(year, month, 1)
		var daysInMonth = new Date(year, month + 1, 0).getDate()

		var lastMonth = new Date()
		lastMonth.setMonth(month - 1)
		lastMonth = lastMonth.getMonth()

		var nextMonth = new Date()
		nextMonth.setMonth(month + 1)
		nextMonth = nextMonth.getMonth()

		var lastMonthDays = new Date(year, lastMonth, 0).getDate()
		var MonthName = new Date(0, month).toLocaleString('default', {month: "long"})
		var startDay = CurrDate.getDay()

		var Saturdays = {}
		for (let i = 0; i < daysInMonth; i++) {
			if (new Date(year, month, i).getDay() == 6) {
				Saturdays[i] = true
			}
		}

		var daysWithAppointment = [], filteredAppointments = [];
		if (Appointments[month]) {
			daysWithAppointment = Appointments[month].map(x => parseInt(x.on))
			filteredAppointments = Appointments[month].filter(x => x.on == this.state.day)
		}

		return `<div class="calendar">
		<div class="calendar-body">
			<div class="calendar-date">
				<h4>${CurrDate.toLocaleString('default', {month: "long"})} - ${year}</h4>
				<div class="gap-s column">
					<span class="arrow" onclick="this.base.setMonth(${nextMonth})"></span>
					<span class="arrow r-180" onclick="this.base.setMonth(${lastMonth})"></span>
				</div>
			</div>
			<hr>
			<div class="calendar-weekday-grid">
				${Snowblind.makeArray("span", ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])}
				${Snowblind.makeIter(startDay, (i) => {
					var Day = lastMonthDays + i - startDay + 1
					return `<span class="calendar-weekday gray-out" data-month="${lastMonth}" data-day="${Day}">${Day}</span>`
				})}
				${Snowblind.makeIter(daysInMonth, (i) => {
					i = i + 1
					var Saturday = Saturdays[i]
					var hasAppointment = daysWithAppointment.indexOf(i) != -1
					return `<span class="calendar-weekday ${Saturday ? "is-saturday": ""} ${i == this.state.day ? "selected" : ""} ${hasAppointment ? "has-appointment" : ""}" data-month="${month}" data-day="${i}" onclick="this.base.selectDay(${i})">${i}</span>`
				})}
			</div>
			<hr>
			<div class="appointment-container">
				${Snowblind.makeIter(filteredAppointments || [], (Appointment) => {
					return `<div class="appointment">
						<h6>${Appointment.on}th ${MonthName} ${year}</h6>
						<div class="center gap-s">
							<span class="calendar-time">${Appointment.when}</span>
							<hr>
							<div class="column">
								<h5 class="appointment-title">${Appointment.title}</h5>
								<a href="${Appointment.url}" class="appointment-url">${Appointment.at}</a>
							</div>
						</div>
					</div>`
				})}
		</div>
		</div>`
	}
}
