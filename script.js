var isAlreadyIn = localStorage.getItem("isAlreadyIn") ? JSON.parse(localStorage.getItem("isAlreadyIn")) : false;
$(function () {
    isAlreadyIn ? $("#main-button").text("Out Time") : $("#main-button").text("In Time");
    var localData = localStorage.getItem("logData");
    if (localData) {
        $("#log-tbody").html(localData);
    }
    $("#main-button").on('click', function (e) {
        if (!isAlreadyIn) {
            $("#log-tbody").append(`
                <tr>
                    <td>${new Date()}</td>
                    <td></td>
                    <td></td>
                </tr>
            `);
        } else {
            $($($("#log-tbody tr")[$("#log-tbody tr").length - 1]).children()[1]).text(new Date());
            var diff = ((new Date($($($("#log-tbody tr")[$("#log-tbody tr").length - 1]).children()[1]).text()).getTime() - new Date($($($("#log-tbody tr")[$("#log-tbody tr").length - 1]).children()[0]).text()).getTime()) / 1000) / 60;
            $($($("#log-tbody tr")[$("#log-tbody tr").length - 1]).children()[2]).text(Math.abs(Math.round(diff)).toString() + " Minutes");
        }
        localStorage.setItem("logData", $("#log-tbody").html().toString());
        isAlreadyIn = !isAlreadyIn;
        localStorage.setItem("isAlreadyIn", isAlreadyIn.toString());
        isAlreadyIn ? $(this).text("Out Time") : $(this).text("In Time");
    });
});