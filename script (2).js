// script.js
document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // جمع بيانات النموذج
    const teacherId = document.getElementById('teacher-id').value;
    const teacherName = document.getElementById('teacher-name').value;
    const attendanceType = document.getElementById('attendance-type').value;
    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    
    // إنشاء صف جديد في الجدول
    const table = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    
    cell1.textContent = teacherId;
    cell2.textContent = teacherName;
    cell3.textContent = attendanceType;
    cell4.textContent = dateString;
    cell5.textContent = timeString;
    
    // إعادة تعيين النموذج
    document.getElementById('attendance-form').reset();
});

// تفعيل الكاميرا وقراءة الباركود باستخدام QuaggaJS
document.getElementById('start-scanner').addEventListener('click', function() {
    document.getElementById('scanner-container').style.display = 'block';
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: document.querySelector('#scanner-container')    // Or '#yourElement' (optional)
        },
        decoder : {
            readers : ["code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        console.log("Barcode detected and processed : [" + code + "]", result);
        
        // استخدم القيمة من الباركود لتحديث رقم المعلم في النموذج
        document.getElementById('teacher-id').value = code;
        
        // توقف عن المسح بعد اكتشاف الباركود
        Quagga.stop();
        document.getElementById('scanner-container').style.display = 'none';
    });
});
