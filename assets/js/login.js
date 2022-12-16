

const params = new URLSearchParams();

// remove number formatting then add +1
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+1' + match[1] + match[2] + match[3];
    }
    return null;
}





function validate() {
    const input2 = document.getElementById('codeInput');
    let code = input2.value;

    params.delete('number');
    params.delete('code');
    params.append('code', code);

    fetch('http://localhost:3000/login', {
                method: 'POST',
                body: params
            })

                .then(function (response) {
                    return response.json()
                })
        
}


// login and send input data to server
function login() {

    const input = document.getElementById('phoneInput')
    let number = input.value

    if (isNaN(parseInt(number)) || parseInt(number) === null) {
        console.log('Invalid phone number');
        const divText = document.getElementsByClassName('heading-text')[0];

        divText.innerText = 'Invalid phone number!';
        divText.style.color = 'red';
        setTimeout(() => {
            divText.style.color = "black";
            divText.innerText = 'Please enter a valid phone number! No dashes or spaces!';
        }, 3000);
        return
    } else {
        formattedNumber = formatPhoneNumber(number)
        if (formattedNumber === null || formattedNumber.length > 12) {
            console.log('Invalid phone number');
            const divText = document.getElementsByClassName('heading-text')[0];

            divText.innerText = 'Invalid phone number!';
            divText.style.color = 'red';
            setTimeout(() => {
                divText.style.color = "black";
                divText.innerText = 'Please enter a valid phone number! No dashes or spaces!';
            }, 3000);
        } else {

            let heading = document.getElementsByClassName('heading')[0];
            let phoneForm = document.getElementsByClassName('form-container')[0];
            let heading2 = document.getElementsByClassName('heading-2')[0];
            let codeForm = document.getElementsByClassName('form-container-2')[0];
            

            heading.classList.add('slide-out');
            phoneForm.classList.add('slide-out');
            setTimeout(() => {
                heading.style.display = 'none';
                phoneForm.style.display = 'none';
                codeForm.style.opacity = 1;
                heading2.style.opacity = 1;
            }, 1000);

            heading2.style.display = 'flex';
            codeForm.style.display = 'flex';
            
        
            
            params.delete("number")
            params.append('number', formattedNumber)
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: params
            })

                .then(function (response) {
                    return response.json()
                })
        }
    }



}