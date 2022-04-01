
const doc = window.location.pathname

if (doc.endsWith("index.html")) {
    let increment = document.getElementById("increment")
    let counter = document.getElementById("counter")
    let reset = document.getElementById("reset")
    let save = document.getElementById("save")

    increment.addEventListener("click", function () {
        count = parseInt(counter.innerHTML)
        count += 1
        counter.innerHTML = count
    })

    reset.addEventListener("click", function () {
        counter.innerHTML = 0
    })

    save.addEventListener("click", function () {

        let d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let day = d.getDate()
        // let mins = Math.round(Math.random() * 5)
        let date = year + "-" + month + "-" + day //+ "-" + mins

        count = parseInt(counter.innerHTML)
        saveDateAndCountToFile(date, count)

        counter.innerHTML = 0
    })
}

if (doc.endsWith("records.html")) {
    let recordsHTML = document.getElementById("records")
    let records = getDateAndCountFromFile()

    if (records !== null) {
        newRecords = ""
        Object.entries(records).forEach(([date, count]) => {
            let d = new Date(date)
            let month = getThreeLetterMonth(d.getMonth())
            let day = d.getDate()

            let singleRecord = "<div class='record'><p>" + month + " " + day + "</p><p class='kick'>" + count + " kicks</p>"

            newRecords += singleRecord
        })
        recordsHTML.innerHTML = newRecords
    }
}


function saveDateAndCountToFile(date, count) {
    records = getDateAndCountFromFile()

    if (records === null) {
        records = { [date]: count }
    } else {
        if (records[date]) {
            records[date] = records[date] + count
        } else {
            records[date] = count
        }
    }

    localStorage.setItem("records", JSON.stringify(records))
    // console.log(getDateAndCountFromFile())
}

function getDateAndCountFromFile() {
    return JSON.parse(localStorage.getItem("records"))
}

function getThreeLetterMonth(n) {
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[n]
}