function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    var phoneRegex = /^\+?\d{8,15}$/;
    return phoneRegex.test(phone);
}

function validateAddress(address) {
    return address.trim() !== '';
}

function submitForm() {
    var formData = {
        vardas: document.getElementById('name').value,
        pavarde: document.getElementById('surname').value,
        elPastas: document.getElementById('email').value,
        telefonas: document.getElementById('phone').value,
        adresas: document.getElementById('address').value,

        feature1: parseFloat(document.getElementById('feature1').value),
        feature2: parseFloat(document.getElementById('feature2').value),
        feature3: parseFloat(document.getElementById('feature3').value),
        feature4: parseFloat(document.getElementById('feature4').value),
        feature5: parseFloat(document.getElementById('feature5').value),
    };

    if (!validateEmail(formData.elPastas)) {
        alert('Neteisingas el. pašto adresas');
        return;
    }

    if (!validatePhone(formData.telefonas)) {
        alert('Neteisingas telefono numeris');
        return;
    }

    if (!validateAddress(formData.adresas)) {
        alert('Neteisingas adresas');
        return;
    }

    displayResult(formData);
    adjustTextColors(formData);
}

function calculateAverage(formData) {
    var sum = 0;
    var count = 0;

    for (var key in formData) {
        if (!isNaN(formData[key]) && key.indexOf('feature') !== -1) {
            sum += formData[key];
            count++;
        }
    }

    return count > 0 ? sum / count : 0;
}

function displayResult(formData) {
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    resultElement.innerHTML += 'Vardas: ' + formData['vardas'] + '\n';
    resultElement.innerHTML += 'Pavarde: ' + formData['pavarde'] + '\n';
    resultElement.innerHTML += 'ElPastas: ' + formData['elPastas'] + '\n';

    for (var key in formData) {
        if (!isNaN(formData[key]) && key.indexOf('feature') !== -1) {
            var propertyName = key.charAt(key.length - 1) + ': ' + formData[key];
            resultElement.innerHTML += propertyName + '\n';
        }
    }

    var average = calculateAverage(formData);
    resultElement.innerHTML += 'Vidurkis: ' + average.toFixed(2) + '\n';
}

function adjustTextColors(formData) {
    var resultElement = document.getElementById('result');
    var average = calculateAverage(formData);

    if (average < 10) {
        resultElement.style.color = 'red';
    } else if (average < 20) {
        resultElement.style.color = 'orange';
    } else {
        resultElement.style.color = 'green';
    }
}
