/*js ملف جافا سكريبت لإدارة التنقل بين الصفحات والتحقق من صحة النماذج وحفظ البيانات */ 
 /*
 //ينتظر تحميل محتوى الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
   //تخزين مراجع لجميع الصفحات في كائن
    const pages = {
        first: document.getElementById('first-page'),// الصفحة الرئيسية1
        old: document.getElementById('old-page'),// صفحة القديم2
        oldOptions: document.getElementById('old-options-page'),// صفحة القديم الثانية3
        new: document.getElementById('new-page'),// صفحة الجديد4
        doctor: document.getElementById('doctor-page'),// صفحة الدكتور5
        patient: document.getElementById('patient-page'),// صفحة المريض6
        staff: document.getElementById('staff-page'),// صفحة الموظف7
        doctorAbdo: document.getElementById('doctor-abdo-page'),// صفحة الدكتور عبدو8
        patientAbdo: document.getElementById('patient-abdo-page'),// صفحة المريض عبدو9
        staffAbdo: document.getElementById('staff-abdo-page')// صفحة الموظف عبدو10
    };

    // تهيئة جميع الصفحات - إخفاء كل الصفحات ما عدا الصفحة الأولى
    function initPages() {
        for (const page in pages) {
            if (pages[page]) {
                pages[page].style.display = 'none';
            }
        }
        if (pages.first) {
            pages.first.style.display = 'block';
        }
    }

    // وظيفة لعرض صفحة معينة وإخفاء الباقي
    function showPage(pageName) {
        console.log('محاولة فتح الصفحة:', pageName);
        for (const page in pages) {
            if (pages[page]) {
                pages[page].style.display = 'none';
            }
        }
        if (pages[pageName]) {
            pages[pageName].style.display = 'block';
            console.log('تم فتح الصفحة:', pageName);
        } else {
            console.error('الصفحة غير موجودة:', pageName);
        }
    }

    // تهيئة الصفحات عند تحميل الموقع
    initPages();

    // تهيئة حقول التاريخ
    initDateFields();

    // إضافة مستمعي الأحداث للأزرار
    addEventListeners();

    // وظائف إضافة مستمعي الأحداث
    function addEventListeners() {
        // الصفحة الرئيسية
        const submitNew = document.getElementById('submit-new');
        const submitOld = document.getElementById('submit-old');
        
        if (submitNew) {
            submitNew.addEventListener('click', function() {
                console.log('نقر على زر جديد');
                showPage('new');
            });
        }
        
        if (submitOld) {
            submitOld.addEventListener('click', function() {
                console.log('نقر على زر قديم');
                showPage('old');
            });
        }

        // صفحة القديم
        const submitFinseOld = document.getElementById('submit-finseold');
        if (submitFinseOld) {
            submitFinseOld.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الدخول للقديم');
                const userId = document.getElementById('id-old').value;
                if (validateUserId(userId)) {
                    showPage('oldOptions');
                }
            });
        }

        // صفحة القديم الثانية
        const submitDoctorId = document.getElementById('submit-doctor-id');
        const submitPatientId = document.getElementById('submit-patient-id');
        const submitStaffId = document.getElementById('submit-staff-id');
        
        if (submitDoctorId) {
            submitDoctorId.addEventListener('click', function() {
                console.log('نقر على زر الدكتور في القديم');
                showPage('doctorAbdo');
            });
        }
        
        if (submitPatientId) {
            submitPatientId.addEventListener('click', function() {
                console.log('نقر على زر المريض في القديم');
                showPage('patientAbdo');
            });
        }
        
        if (submitStaffId) {
            submitStaffId.addEventListener('click', function() {
                console.log('نقر على زر الموظف في القديم');
                showPage('staffAbdo');
            });
        }

        // صفحة الجديد
        const submitDoctorPage = document.getElementById('submit-doctor-page');
        const submitPatientPage = document.getElementById('submit-patient-page');
        const submitStaffPage = document.getElementById('submit-staff-page');
        
        if (submitDoctorPage) {
            submitDoctorPage.addEventListener('click', function() {
                console.log('نقر على زر الدكتور في الجديد');
                showPage('doctor');
            });
        }
        
        if (submitPatientPage) {
            submitPatientPage.addEventListener('click', function() {
                console.log('نقر على زر المريض في الجديد');
                showPage('patient');
            });
        }
        
        if (submitStaffPage) {
            submitStaffPage.addEventListener('click', function() {
                console.log('نقر على زر الموظف في الجديد');
                showPage('staff');
            });
        }

        // صفحة الدكتور
        const submitDoc = document.getElementById('submit-doc');
        if (submitDoc) {
            submitDoc.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الدكتور');
                if (validateDoctorForm()) {
                    console.log('تم التحقق من بيانات الدكتور بنجاح');
                    // حفظ بيانات الدكتور في قاعدة البيانات
                    saveDoctorData();
                    showPage('doctorAbdo');
                } else {
                    console.log('فشل التحقق من بيانات الدكتور');
                }
            });
        }

        // صفحة المريض
        const submitPati = document.getElementById('submit-pati');
        if (submitPati) {
            submitPati.addEventListener('click', function() {
                console.log('نقر على زر تسجيل المريض');
                if (validatePatientForm()) {
                    console.log('تم التحقق من بيانات المريض بنجاح');
                    // حفظ بيانات المريض في قاعدة البيانات
                    savePatientData();
                    showPage('patientAbdo');
                } else {
                    console.log('فشل التحقق من بيانات المريض');
                }
            });
        }

        // صفحة الموظفين
        const submitStaf = document.getElementById('submit-staf');
        if (submitStaf) {
            submitStaf.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الموظف');
                if (validateStaffForm()) {
                    console.log('تم التحقق من بيانات الموظف بنجاح');
                    // حفظ بيانات الموظف في قاعدة البيانات
                    saveStaffData();
                    showPage('staffAbdo');
                } else {
                    console.log('فشل التحقق من بيانات الموظف');
                }
            });
        }

        // إضافة مستمعي الأحداث للتحقق من صحة البيانات أثناء الكتابة
        addValidationListeners();

        // إضافة مستمعي الأحداث للقائمة المتحركة في صفحات عبدو
        initMenuToggleForAllPages();
    }

    // وظائف التحقق من صحة البيانات
    function validateUserId(userId) {
        const errorElement = document.getElementById('idError');
        if (!errorElement) {
            console.error('عنصر الخطأ غير موجود');
            return false;
        }
        
        if (!userId || userId.length < 3 || userId.length > 15) {
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }


    // صفحه تسجيل الدكتور/////////////////////////////////////////////////////////////



    function validateDoctorForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات الدكتور');
        
        // التحقق من الاسم
        const nameInput = document.getElementById('userName');
        const nameError = document.getElementById('nameError');
        if (nameInput && nameError) {
            const name = nameInput.value;
            if (name.length < 3 || name.length > 30) {
                nameError.style.display = 'block';
                isValid = false;
                console.log('خطأ في الاسم');
            } else {
                nameError.style.display = 'none';
            }
        } else {
            console.error('عناصر الاسم غير موجودة');
            isValid = false;
        }
        
        // التحقق من العمر
        const ageInput = document.getElementById('id-user');
        const ageError = document.getElementById('idError');
        if (ageInput && ageError) {
            const age = parseInt(ageInput.value);
            if (isNaN(age) || age < 25 || age > 70) {
                ageError.style.display = 'block';
                isValid = false;
                console.log('خطأ في العمر');
            } else {
                ageError.style.display = 'none';
            }
        }
        
        // التحقق من البريد الإلكتروني
        const emailInput = document.getElementById('userEmail');
        const emailError = document.getElementById('emailError');
        if (emailInput && emailError) {
            const email = emailInput.value;
            if (!validateEmail(email)) {
                emailError.style.display = 'block';
                isValid = false;
                console.log('خطأ في البريد الإلكتروني');
            } else {
                emailError.style.display = 'none';
            }
        }
        
        // التحقق من رقم الهاتف
        const phoneInput = document.getElementById('your-phone');
        if (phoneInput) {
            const phone = phoneInput.value;
            if (!validatePhone(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح');
                isValid = false;
                console.log('خطأ في رقم الهاتف');
            }
        }
        
        // التحقق من سنوات الخبرة
        const experienceInput = document.getElementById('id-experience');
        if (experienceInput) {
            const experience = parseInt(experienceInput.value);
            if (isNaN(experience) || experience < 1 || experience > 100) {
                alert('يجب أن تكون سنوات الخبرة بين 1 و 100');
                isValid = false;
                console.log('خطأ في سنوات الخبرة');
            }
        }
        
        // التحقق من اختيار المستشفى
        const hospitalSelect = document.getElementById('hospital-numberr');
        if (hospitalSelect) {
            const hospital = hospitalSelect.value;
            if (!hospital || hospital === 'disabled selected') {
                alert('يرجى اختيار رقم المستشفى');
                isValid = false;
                console.log('خطأ في اختيار المستشفى');
            }
        }
        
        // التحقق من اختيار التخصص
        const departmentSelect = document.getElementById('doctordepartment');
        if (departmentSelect) {
            const department = departmentSelect.value;
            if (!department || department === 'disabled selected') {
                alert('يرجى اختيار التخصص');
                isValid = false;
                console.log('خطأ في اختيار التخصص');
            }
        }
        
        // التحقق من اختيار النوع
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            alert('يرجى اختيار الجنس');
            isValid = false;
            console.log('خطأ في اختيار الجنس');
        }
        
        console.log('نتيجة التحقق من الدكتور:', isValid);
        return isValid;
    }



    //صفحه تسجيل المريض//////////////////////////////////////////////////////////////


    function validatePatientForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات المريض');
        
        // التحقق من الاسم
        const nameInput = document.getElementById('userName');
        const nameError = document.getElementById('nameError');
        if (nameInput && nameError) {
            const name = nameInput.value;
            if (name.length < 3 || name.length > 40) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
        }
/*
        
         // التحقق من رقم الهاتف
        const phoneInput = document.getElementById('your-phone');
        if (phoneInput) {
            const phone = phoneInput.value;
            if (!validatePhone(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح');
                isValid = false;
                console.log('خطأ في رقم الهاتف');
            }
        }
        *//*  
        // التحقق من رقم الهاتف
        const phoneInput = document.getElementById('your-phone');
        if (phoneInput) {
            const phone = phoneInput.value;
            if (validatePhone(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح');
                isValid = false;
                console.log('خطأ في رقم الهاتف');
            }
        }/*
        // 2. التحقق من رقم الهاتف (مهم)
    const phoneInput = document.getElementById('your-phone');
    if (phoneInput) {
        const phone = phoneInput.value.trim();
        console.log('📱 رقم الهاتف:', phone);
        
        if (!phone) {
            errors.push('• رقم الهاتف مطلوب');
            isValid = false;
            showError(phoneInput, 'يرجى إدخال رقم الهاتف');
        } else if (phone.length !== 11) {
            errors.push('• رقم الهاتف يجب أن يكون 11 رقماً');
            isValid = false;
            showError(phoneInput, 'يجب أن يكون 11 رقماً');
        } else if (!/^\d+$/.test(phone)) {
            errors.push('• رقم الهاتف يجب أن يحتوي على أرقام فقط');
            isValid = false;
            showError(phoneInput, 'يجب أن يحتوي على أرقام فقط');
        } else if (!phone.startsWith('01')) {
            errors.push('• رقم الهاتف يجب أن يبدأ بـ 01');
            isValid = false;
            showError(phoneInput, 'يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015');
        } else {
            hideError(phoneInput);
        }
    }

    */
            
            /*
           // التحقق من الرقم القومي - معدل ليكون 14 رقم فقط
const nationalIdInput = document.getElementById('id-national');
if (nationalIdInput) {
    const nationalId = nationalIdInput.value.trim();
    if (nationalId.length !== 14  ) {
        alert('يجب أن يكون الرقم القومي 14 رقماً');
        isValid = true;
    }
}
/*
    // التحقق من الرقم القومي
    const idInput = document.querySelector('#patient-page input[name="nationalid"]');
    const idError = document.querySelector('#patient-page #idError');
    if (idInput && idError) {
        if (idInput.value.length < 13 || idInput.value.length > 14) {
            idError.style.display = 'block';
            isValid = false;
        } else {
            idError.style.display = 'none';
        }
    }
    
       */ 



/*
// التحقق من اختيار المستشفى في صفحة المريض - الحل الأمثل
const hospitalSelect = document.getElementById('hospital-number');
if (hospitalSelect) {
    // تحقق من أن المستخدم لم يختار الخيار الافتراضي
    if (hospitalSelect.selectedIndex <= 0) {
        alert('يرجى اختيار رقم المستشفى من القائمة');
        isValid = false;
    }
}

        // التحقق من اختيار المرض
        const illnessSelect = document.getElementById('patient-illness');
        if (illnessSelect) {
            const illness = illnessSelect.value;
            if (illnessSelect.selectedIndex <= 0) {
                alert('يرجى اختيار المرض');
                isValid = false;
            }
        }
        
        // التحقق من تاريخ الميلاد
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');
        if (daySelect && monthSelect && yearSelect) {
            const day = daySelect.value;
            const month = monthSelect.value;
            const year = yearSelect.value;
            if (!day || !month || !year) {
                alert('يرجى اختيار تاريخ الميلاد كاملاً');
                isValid = false;
            }
        }
        
        // التحقق من العنوان
        const addressSelect = document.getElementById('address');
        if (addressSelect) {
            const address = addressSelect.value;
            if (addressSelect.selectedIndex <= 0) {
                alert('يرجى اختيار العنوان');
                isValid = false;
            }
        }
        
        // التحقق من اختيار النوع
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            alert('يرجى اختيار الجنس');
            isValid = false;
        }
        
        console.log('نتيجة التحقق من المريض:', isValid);
        return isValid;
    }
        
    

        //صفحه تسجيل الاسطف/////////////////////////////////////////////////////////////////

    function validateStaffForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات الموظف');







    // التحقق من الاسم
    const nameInput = document.querySelector('#staff-page input[name="userName"]');
    const nameError = document.querySelector('#staff-page #nameError');
    if (nameInput && nameError) {
        if (nameInput.value.length < 3 || nameInput.value.length > 40) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
    }
    
    // التحقق من رقم الهاتف
    const phoneInput = document.querySelector('#staff-page input[name="phone"]');
    const phoneError = document.querySelector('#staff-page #emailError');
    if (phoneInput && phoneError) {
        if (phoneInput.value.length !== 11 || isNaN(phoneInput.value)) {
            phoneError.textContent = 'يرجى إدخال رقم هاتف صحيح (11 رقم)';
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }
    }
    
    // التحقق من البريد الإلكتروني
    const emailInput = document.querySelector('#staff-page input[name="userEmail"]');
    const emailErrors = document.querySelectorAll('#staff-page #emailError');
    const emailError = emailErrors[1];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && emailError) {
        if (!emailPattern.test(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
    }
    
    // التحقق من العمر
    const ageInput = document.querySelector('#staff-page input[name="idage"]');
    const ageError = document.querySelector('#staff-page #idError');
    if (ageInput && ageError) {
        if (ageInput.value < 18 || ageInput.value > 65 || !ageInput.value) {
            ageError.textContent = 'يجب أن يكون العمر بين 18 و 65 سنة';
            ageError.style.display = 'block';
            isValid = false;
        } else {
            ageError.style.display = 'none';
        }
    }
    
    // التحقق من النوع
    const genderRadios = document.querySelectorAll('#staff-page input[name="gender"]');
    let genderSelected = false;
    if (genderRadios) {
        genderRadios.forEach(radio => {
            if (radio.checked) genderSelected = true;
        });
        if (!genderSelected) {
            alert('يرجى اختيار النوع');
            isValid = false;
        }
    }

       // التحقق من معرف المستشفى - الحل الأمثل
const hospitalSelect = document.querySelector('#staff-page select[name="Hospital-id"]');
const hospitalError = document.querySelector('#staff-page #statusError');
if (hospitalSelect && hospitalError) {
    // تحقق من أن القيمة ليست الخيار الافتراضي
    if (hospitalSelect.selectedIndex <= 0) {
        hospitalError.textContent = 'يرجى اختيار رقم المستشفى';
        hospitalError.style.display = 'block';
        isValid = false;
    } else {
        hospitalError.style.display = 'none';
    }
}
    
    // التحقق من المسمى الوظيفي
    const jobSelect = document.querySelector('#staff-page select[name="Hospital-job"]');
    const jobErrors = document.querySelectorAll('#staff-page #statusError');
    const jobError = jobErrors[1];
    if (jobSelect && jobError) {
        if (!jobSelect.value || jobSelect.value.includes("disabled")) {
            jobError.style.display = 'block';
            isValid = false;
        } else {
            jobError.style.display = 'none';
        }
    }
    
    return isValid;
}



    // وظائف مساعدة للتحقق من صحة البيانات
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^01[0-2,5]{1}[0-9]{8}$/;
        return re.test(phone);
    }

    // إضافة مستمعي الأحداث للتحقق أثناء الكتابة
    function addValidationListeners() {
        // التحقق من الاسم أثناء الكتابة
        const nameInputs = document.querySelectorAll('input[name="userName"]');
        nameInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    if (this.value.length < 3 || this.value.length > 30) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });

        // التحقق من البريد الإلكتروني أثناء الكتابة
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    if (!validateEmail(this.value)) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });





        // التحقق من رقم الهاتف أثناء الكتابة
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (!validatePhone(this.value)) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }

    // تهيئة حقول التاريخ
    function initDateFields() {
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');
        
        if (daySelect && monthSelect && yearSelect) {
            // ملء الأيام (1-31)
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
            
            // ملء السنوات (من 1920 إلى 2025)
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= 1920; i--) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }
        }
    }

    // وظائف حفظ البيانات في قاعدة البيانات
    function saveDoctorData() {
        const doctorData = {
            name: document.getElementById('userName').value,
            age: document.getElementById('id-user').value,
            email: document.getElementById('userEmail').value,
            phone: document.getElementById('your-phone').value,
            experience: document.getElementById('id-experience').value,
            hospital: document.getElementById('hospital-numberr').value,
            doctorType: document.getElementById('doctor-status').value,
            department: document.getElementById('doctordepartment').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };
        
        console.log('حفظ بيانات الدكتور:', doctorData);
        localStorage.setItem('doctorData', JSON.stringify(doctorData));
    }

    function savePatientData() {
        const patientData = {
            name: document.getElementById('userName').value,
            phone: document.getElementById('your-phone').value,
            nationalId: document.getElementById('id-national').value,
            hospital: document.getElementById('hospital-number').value,
            illness: document.getElementById('patient-illness').value,
            birthDate: {
                day: document.getElementById('day').value,
                month: document.getElementById('month').value,
                year: document.getElementById('year').value
            },
            address: document.getElementById('address').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };
        
        console.log('حفظ بيانات المريض:', patientData);
        localStorage.setItem('patientData', JSON.stringify(patientData));
    }

    function saveStaffData() {
        const staffData = {
            name: document.getElementById('userName').value,
            phone: document.getElementById('your-phone').value,
            email: document.getElementById('userEmail').value,
            age: document.getElementById('id-user').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            hospital: document.getElementById('hospital-numberr').value,
            job: document.getElementById('hospital-job').value
        };
        
        console.log('حفظ بيانات الموظف:', staffData);
        localStorage.setItem('staffData', JSON.stringify(staffData));
    }

    // إضافة وظائف للقائمة المتحركة في صفحات عبدو
    function initMenuToggleForAllPages() {
        // البحث عن جميع أزرار القائمة في جميع الصفحات
        const menuButtons = document.querySelectorAll('#menu');
        const actionMenus = document.querySelectorAll('#action');
        
        menuButtons.forEach((menuButton, index) => {
            if (menuButton && actionMenus[index]) {
                menuButton.addEventListener('click', function() {
                    actionMenus[index].classList.toggle('active');
                });
            }
        });
    }
}); 



// وظائف القائمة المنسدلة
//بديل كود عبدو للقوائم المنسدلة////////////////////////////////////////////////////////

// دالة موحدة لإدارة جميع القوائم المنسدلة
function setupDropdown(menuId, actionsId) {
    // الحصول على العناصر
    const menu = document.getElementById(menuId);
    const actions = document.getElementById(actionsId);
    
    // التحقق من وجود العناصر
    if (!menu || !actions) {
        console.error(`لم يتم العثور على العناصر: ${menuId}, ${actionsId}`);
        return;
    }
    
    // إضافة حدث النقر على زر القائمة
    menu.addEventListener("click", (event) => {
        event.stopPropagation(); // منع انتشار الحدث
        toggleMenu(menu, actions);
    });
    
    // إضافة حدث النقر على المستند لإغلاق القائمة
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !actions.contains(event.target)) {
            closeMenu(menu, actions);
        }
    });
    
    // إضافة أحداث للروابط داخل القائمة
    const links = actions.querySelectorAll("a"); 
    links.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu(menu, actions); 
        });
    });
}

// دالة لتبديل حالة القائمة (فتح/إغلاق)
function toggleMenu(menu, actions) {
    menu.classList.toggle("is-active");
    actions.classList.toggle("is-active");
}

// دالة لإغلاق القائمة
function closeMenu(menu, actions) {
    menu.classList.remove("is-active");
    actions.classList.remove("is-active");
}

// تهيئة جميع القوائم المنسدلة
document.addEventListener('DOMContentLoaded', function() {
    // إعداد القوائم للطبيب، المريض، والموظف
    // setupDropdown("menus", "actions");   // الطبيب
    setupDropdown("menu", "action");     // المريض
    //setupDropdown("menuaa", "actionaa"); // الموظف
    
    // تهيئة AOS مرة واحدة فقط
    AOS.init({
        duration: 800,
        once: true
    });
});
*/
//ينتظر تحميل محتوى الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
   //تخزين مراجع لجميع الصفحات في كائن
    const pages = {
        first: document.getElementById('first-page'),
        old: document.getElementById('old-page'),
        oldOptions: document.getElementById('old-options-page'),
        new: document.getElementById('new-page'),
        doctor: document.getElementById('doctor-page'),
        patient: document.getElementById('patient-page'),
        staff: document.getElementById('staff-page'),
        doctorAbdo: document.getElementById('doctor-abdo-page'),
        patientAbdo: document.getElementById('patient-abdo-page'),
        staffAbdo: document.getElementById('staff-abdo-page')
    };

    // تهيئة جميع الصفحات - إخفاء كل الصفحات ما عدا الصفحة الأولى
    function initPages() {
        for (const page in pages) {
            if (pages[page]) {
                pages[page].style.display = 'none';
            }
        }
        if (pages.first) {
            pages.first.style.display = 'block';
        }
    }

    // وظيفة لعرض صفحة معينة وإخفاء الباقي
    function showPage(pageName) {
        console.log('محاولة فتح الصفحة:', pageName);
        for (const page in pages) {
            if (pages[page]) {
                pages[page].style.display = 'none';
            }
        }
        if (pages[pageName]) {
            pages[pageName].style.display = 'block';
            console.log('تم فتح الصفحة:', pageName);
        } else {
            console.error('الصفحة غير موجودة:', pageName);
        }
    }

    // تهيئة الصفحات عند تحميل الموقع
    initPages();

    // تهيئة حقول التاريخ
    initDateFields();

    // إضافة مستمعي الأحداث للأزرار
    addEventListeners();

    // وظائف إضافة مستمعي الأحداث
    function addEventListeners() {
        // الصفحة الرئيسية
        const submitNew = document.getElementById('submit-new');
        const submitOld = document.getElementById('submit-old');
        
        if (submitNew) {
            submitNew.addEventListener('click', function() {
                console.log('نقر على زر جديد');
                showPage('new');
            });
        }
        
        if (submitOld) {
            submitOld.addEventListener('click', function() {
                console.log('نقر على زر قديم');
                showPage('old');
            });
        }

        // صفحة القديم
        const submitFinseOld = document.getElementById('submit-finseold');
        if (submitFinseOld) {
            submitFinseOld.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الدخول للقديم');
                const userId = document.getElementById('id-old').value;
                if (validateUserId(userId)) {
                    showPage('oldOptions');
                }
            });
        }

        // صفحة القديم الثانية
        const submitDoctorId = document.getElementById('submit-doctor-id');
        const submitPatientId = document.getElementById('submit-patient-id');
        const submitStaffId = document.getElementById('submit-staff-id');
        
        if (submitDoctorId) {
            submitDoctorId.addEventListener('click', function() {
                console.log('نقر على زر الدكتور في القديم');
                showPage('doctorAbdo');
            });
        }
        
        if (submitPatientId) {
            submitPatientId.addEventListener('click', function() {
                console.log('نقر على زر المريض في القديم');
                showPage('patientAbdo');
            });
        }
        
        if (submitStaffId) {
            submitStaffId.addEventListener('click', function() {
                console.log('نقر على زر الموظف في القديم');
                showPage('staffAbdo');
            });
        }

        // صفحة الجديد
        const submitDoctorPage = document.getElementById('submit-doctor-page');
        const submitPatientPage = document.getElementById('submit-patient-page');
        const submitStaffPage = document.getElementById('submit-staff-page');
        
        if (submitDoctorPage) {
            submitDoctorPage.addEventListener('click', function() {
                console.log('نقر على زر الدكتور في الجديد');
                showPage('doctor');
            });
        }
        
        if (submitPatientPage) {
            submitPatientPage.addEventListener('click', function() {
                console.log('نقر على زر المريض في الجديد');
                showPage('patient');
            });
        }
        
        if (submitStaffPage) {
            submitStaffPage.addEventListener('click', function() {
                console.log('نقر على زر الموظف في الجديد');
                showPage('staff');
            });
        }

        // صفحة الدكتور
        const submitDoc = document.getElementById('submit-doc');
        if (submitDoc) {
            submitDoc.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الدكتور');
                if (validateDoctorForm()) {
                    console.log('تم التحقق من بيانات الدكتور بنجاح');
                    // حفظ بيانات الدكتور في قاعدة البيانات
                    saveDoctorData();
                    showPage('doctorAbdo');
                } else {
                    console.log('فشل التحقق من بيانات الدكتور');
                }
            });
        }

        // صفحة المريض
        const submitPati = document.getElementById('submit-pati');
        if (submitPati) {
            submitPati.addEventListener('click', function() {
                console.log('نقر على زر تسجيل المريض');
                if (validatePatientForm()) {
                    console.log('تم التحقق من بيانات المريض بنجاح');
                    // حفظ بيانات المريض في قاعدة البيانات
                    savePatientData();
                    showPage('patientAbdo');
                } else {
                    console.log('فشل التحقق من بيانات المريض');
                }
            });
        }

        // صفحة الموظفين
        const submitStaf = document.getElementById('submit-staf');
        if (submitStaf) {
            submitStaf.addEventListener('click', function() {
                console.log('نقر على زر تسجيل الموظف');
                if (validateStaffForm()) {
                    console.log('تم التحقق من بيانات الموظف بنجاح');
                    // حفظ بيانات الموظف في قاعدة البيانات
                    saveStaffData();
                    showPage('staffAbdo');
                } else {
                    console.log('فشل التحقق من بيانات الموظف');
                }
            });
        }

        // إضافة مستمعي الأحداث للتحقق من صحة البيانات أثناء الكتابة
        addValidationListeners();

        // إضافة مستمعي الأحداث للقائمة المتحركة في صفحات عبدو
        initMenuToggleForAllPages();
    }

    // وظائف التحقق من صحة البيانات
    function validateUserId(userId) {
        const errorElement = document.getElementById('idError');
        if (!errorElement) {
            console.error('عنصر الخطأ غير موجود');
            return false;
        }
        
        if (!userId || userId.length < 3 || userId.length > 15) {
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    // صفحه تسجيل الدكتور
    function validateDoctorForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات الدكتور');
        
        // التحقق من الاسم
        const nameInput = document.getElementById('userName');
        const nameError = document.getElementById('nameError');
        if (nameInput && nameError) {
            const name = nameInput.value;
            if (name.length < 3 || name.length > 30) {
                nameError.style.display = 'block';
                isValid = false;
                console.log('خطأ في الاسم');
            } else {
                nameError.style.display = 'none';
            }
        } else {
            console.error('عناصر الاسم غير موجودة');
            isValid = false;
        }
        
        // التحقق من العمر
        const ageInput = document.getElementById('id-user');
        const ageError = document.getElementById('idError');
        if (ageInput && ageError) {
            const age = parseInt(ageInput.value);
            if (isNaN(age) || age < 25 || age > 70) {
                ageError.style.display = 'block';
                isValid = false;
                console.log('خطأ في العمر');
            } else {
                ageError.style.display = 'none';
            }
        }
        
        // التحقق من البريد الإلكتروني
        const emailInput = document.getElementById('userEmail');
        const emailError = document.getElementById('emailError');
        if (emailInput && emailError) {
            const email = emailInput.value;
            if (!validateEmail(email)) {
                emailError.style.display = 'block';
                isValid = false;
                console.log('خطأ في البريد الإلكتروني');
            } else {
                emailError.style.display = 'none';
            }
        }
        
        // التحقق من رقم الهاتف
        const phoneInput = document.getElementById('your-phone');
        if (phoneInput) {
            const phone = phoneInput.value;
            if (!validatePhone(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح');
                isValid = false;
                console.log('خطأ في رقم الهاتف');
            }
        }
        
        // التحقق من سنوات الخبرة
        const experienceInput = document.getElementById('id-experience');
        if (experienceInput) {
            const experience = parseInt(experienceInput.value);
            if (isNaN(experience) || experience < 1 || experience > 100) {
                alert('يجب أن تكون سنوات الخبرة بين 1 و 100');
                isValid = false;
                console.log('خطأ في سنوات الخبرة');
            }
        }
        
        // التحقق من اختيار المستشفى
        const hospitalSelect = document.getElementById('hospital-numberr');
        if (hospitalSelect) {
            const hospital = hospitalSelect.value;
            if (!hospital || hospital === 'disabled selected') {
                alert('يرجى اختيار رقم المستشفى');
                isValid = false;
                console.log('خطأ في اختيار المستشفى');
            }
        }
        
        // التحقق من اختيار التخصص
        const departmentSelect = document.getElementById('doctordepartment');
        if (departmentSelect) {
            const department = departmentSelect.value;
            if (!department || department === 'disabled selected') {
                alert('يرجى اختيار التخصص');
                isValid = false;
                console.log('خطأ في اختيار التخصص');
            }
        }
        
        // التحقق من اختيار النوع
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            alert('يرجى اختيار الجنس');
            isValid = false;
            console.log('خطأ في اختيار الجنس');
        }
        
        console.log('نتيجة التحقق من الدكتور:', isValid);
        return isValid;
    }

    // صفحه تسجيل المريض - الإصلاح النهائي لمشكلة الاسم
    function validatePatientForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات المريض');
        
        // التحقق من الاسم - الإصلاح النهائي
        const nameInput = findPatientNameInput();
        const nameError = document.getElementById('nameError');
        
        if (nameInput && nameError) {
            const name = nameInput.value.trim();
            console.log('👤 الاسم المدخل:', name, 'الطول:', name.length);
            
            if (!name) {
                nameError.textContent = 'يرجى إدخال الاسم';
                nameError.style.display = 'block';
                isValid = false;
                console.log('خطأ: الاسم فارغ');
            } else if (name.length < 3) {
                nameError.textContent = 'الاسم يجب أن يكون 3 أحرف على الأقل';
                nameError.style.display = 'block';
                isValid = false;
                console.log('خطأ: الاسم أقل من 3 أحرف');
            } else if (name.length > 40) {
                nameError.textContent = 'الاسم يجب أن لا يتجاوز 40 حرف';
                nameError.style.display = 'block';
                isValid = false;
                console.log('خطأ: الاسم أكثر من 40 حرف');
            } else {
                nameError.style.display = 'none';
                console.log('✅ الاسم صحيح:', name);
            }
        } else {
            console.error('❌ عناصر الاسم غير موجودة في صفحة المريض');
            console.log('nameInput:', nameInput);
            console.log('nameError:', nameError);
            alert('خطأ في النظام: لم يتم العثور على حقل الاسم');
            isValid = false;
        }
        /*
        // التحقق من رقم الهاتف
        const phoneInput = document.getElementById('your-phone');
        if (phoneInput) {
            const phone = phoneInput.value.trim();
            console.log('📱 رقم الهاتف المدخل:', phone);
            
            if (!phone) {
                alert('يرجى إدخال رقم الهاتف');
                isValid = false;
            } else if (!validatePhone(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح (11 رقماً ويبدأ بـ 010 أو 011 أو 012 أو 015)');
                isValid = false;
                console.log('خطأ في رقم الهاتف:', phone);
            } else {
                console.log('✅ رقم الهاتف صحيح:', phone);
            }
        }
        */
        // التحقق من الرقم القومي
        const nationalIdInput = document.getElementById('id-national');
        if (nationalIdInput) {
            const nationalId = nationalIdInput.value.trim();
            console.log('🆔 الرقم القومي المدخل:', nationalId, 'الطول:', nationalId.length);
            
            if (!nationalId) {
                alert('يرجى إدخال الرقم القومي');
                isValid = false;
            } else if (!/^\d+$/.test(nationalId)) {
                alert('الرقم القومي يجب أن يحتوي على أرقام فقط');
                isValid = false;
                console.log('خطأ: الرقم القومي يحتوي على أحرف غير رقمية');
            } else if (nationalId.length !== 14) {
                alert('يجب أن يكون الرقم القومي 14 رقماً (أنت أدخلت ' + nationalId.length + ' رقماً)');
                isValid = false;
                console.log('خطأ في الرقم القومي:', nationalId, 'الطول:', nationalId.length);
            } else {
                console.log('✅ الرقم القومي صحيح:', nationalId);
            }
        }
        
        // التحقق من اختيار المستشفى
        const hospitalSelect = document.getElementById('hospital-number');
        if (hospitalSelect) {
            if (hospitalSelect.selectedIndex <= 0) {
                alert('يرجى اختيار رقم المستشفى من القائمة');
                isValid = false;
                console.log('خطأ في اختيار المستشفى');
            }
        }

        // التحقق من اختيار المرض
        const illnessSelect = document.getElementById('patient-illness');
        if (illnessSelect) {
            if (illnessSelect.selectedIndex <= 0) {
                alert('يرجى اختيار المرض');
                isValid = false;
                console.log('خطأ في اختيار المرض');
            }
        }
        
        // التحقق من تاريخ الميلاد
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');
        if (daySelect && monthSelect && yearSelect) {
            const day = daySelect.value;
            const month = monthSelect.value;
            const year = yearSelect.value;
            if (!day || !month || !year) {
                alert('يرجى اختيار تاريخ الميلاد كاملاً');
                isValid = false;
                console.log('خطأ في تاريخ الميلاد');
            }
        }
        
        // التحقق من العنوان
        const addressSelect = document.getElementById('address');
        if (addressSelect) {
            if (addressSelect.selectedIndex <= 0) {
                alert('يرجى اختيار العنوان');
                isValid = false;
                console.log('خطأ في العنوان');
            }
        }
        
        // التحقق من اختيار النوع
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            alert('يرجى اختيار الجنس');
            isValid = false;
            console.log('خطأ في اختيار الجنس');
        }
        
        console.log('نتيجة التحقق من المريض:', isValid);
        return isValid;
    }

    // دالة مساعدة للعثور على حقل الاسم في صفحة المريض
    function findPatientNameInput() {
        // محاولات متعددة للعثور على حقل الاسم
        const selectors = [
            '#patient-page input[name="userName"]',
            '#patient-page #userName', 
            '#patient-page input[type="text"]',
            '#patient-page .input-box input',
            'input[name="userName"]'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log('✅ تم العثور على حقل الاسم باستخدام:', selector);
                return element;
            }
        }
        
        console.error('❌ لم يتم العثور على حقل الاسم بأي من المحددات:', selectors);
        return null;
    }

    // صفحه تسجيل الاسطف///////////////////////////////////////////////

    
    function validateStaffForm() {
        let isValid = true;
        console.log('بدء التحقق من بيانات الموظف');

        // التحقق من الاسم
        const nameInput = document.querySelector('#staff-page input[name="userName"]');
        const nameError = document.querySelector('#staff-page #nameError');
        if (nameInput && nameError) {
            if (nameInput.value.length < 3 || nameInput.value.length > 40) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
        }
        
        // التحقق من رقم الهاتف
        const phoneInput = document.querySelector('#staff-page input[name="phone"]');
        const phoneError = document.querySelector('#staff-page #emailError');
        if (phoneInput && phoneError) {
            if (phoneInput.value.length !== 11 || isNaN(phoneInput.value)) {
                phoneError.textContent = 'يرجى إدخال رقم هاتف صحيح (11 رقم)';
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
        }
        
        // التحقق من البريد الإلكتروني
        const emailInput = document.querySelector('#staff-page input[name="userEmail"]');
        const emailErrors = document.querySelectorAll('#staff-page #emailError');
        const emailError = emailErrors[1];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && emailError) {
            if (!emailPattern.test(emailInput.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
        }
        
        // التحقق من العمر
        const ageInput = document.querySelector('#staff-page input[name="idage"]');
        const ageError = document.querySelector('#staff-page #idError');
        if (ageInput && ageError) {
            if (ageInput.value < 18 || ageInput.value > 65 || !ageInput.value) {
                ageError.textContent = 'يجب أن يكون العمر بين 18 و 65 سنة';
                ageError.style.display = 'block';
                isValid = false;
            } else {
                ageError.style.display = 'none';
            }
        }
        
        // التحقق من النوع
        const genderRadios = document.querySelectorAll('#staff-page input[name="gender"]');
        let genderSelected = false;
        if (genderRadios) {
            genderRadios.forEach(radio => {
                if (radio.checked) genderSelected = true;
            });
            if (!genderSelected) {
                alert('يرجى اختيار النوع');
                isValid = false;
            }
        }

        // التحقق من معرف المستشفى
        const hospitalSelect = document.querySelector('#staff-page select[name="Hospital-id"]');
        const hospitalError = document.querySelector('#staff-page #statusError');
        if (hospitalSelect && hospitalError) {
            if (hospitalSelect.selectedIndex <= 0) {
                hospitalError.textContent = 'يرجى اختيار رقم المستشفى';
                hospitalError.style.display = 'block';
                isValid = false;
            } else {
                hospitalError.style.display = 'none';
            }
        }
        
        // التحقق من المسمى الوظيفي
        const jobSelect = document.querySelector('#staff-page select[name="Hospital-job"]');
        const jobErrors = document.querySelectorAll('#staff-page #statusError');
        const jobError = jobErrors[1];
        if (jobSelect && jobError) {
            if (!jobSelect.value || jobSelect.value.includes("disabled")) {
                jobError.style.display = 'block';
                isValid = false;
            } else {
                jobError.style.display = 'none';
            }
        }
        
        return isValid;
    }

    // وظائف مساعدة للتحقق من صحة البيانات
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // دالة التحقق من رقم الهاتف المحسنة
    function validatePhone(phone) {
        // إزالة أي مسافات أو شرطات
        const cleanedPhone = phone.replace(/\D/g, '');
        console.log('📱 رقم الهاتف بعد التنظيف:', cleanedPhone);
        
        // التحقق من أن الرقم يتكون من 11 رقمًا ويبدأ بـ 01
        const re = /^01[0125]\d{8}$/;
        const isValid = re.test(cleanedPhone);
        
        console.log('✅ نتيجة التحقق من الهاتف:', isValid, 'للرقم:', cleanedPhone);
        return isValid;
    }

    // إضافة مستمعي الأحداث للتحقق أثناء الكتابة
    function addValidationListeners() {
        // التحقق من الاسم أثناء الكتابة في صفحة المريض
        const patientNameInput = findPatientNameInput();
        if (patientNameInput) {
            patientNameInput.addEventListener('input', function() {
                const errorElement = document.getElementById('nameError');
                if (errorElement) {
                    const name = this.value.trim();
                    if (!name) {
                        errorElement.textContent = 'يرجى إدخال الاسم';
                        errorElement.style.display = 'block';
                    } else if (name.length < 3) {
                        errorElement.textContent = 'الاسم يجب أن يكون 3 أحرف على الأقل';
                        errorElement.style.display = 'block';
                    } else if (name.length > 40) {
                        errorElement.textContent = 'الاسم يجب أن لا يتجاوز 40 حرف';
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                }
            });
        }

        // التحقق من البريد الإلكتروني أثناء الكتابة
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    if (!validateEmail(this.value)) {
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });

        // التحقق من رقم الهاتف أثناء الكتابة
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (!validatePhone(this.value)) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '';
                }
            });
        });

        // التحقق من الرقم القومي أثناء الكتابة
        const nationalIdInputs = document.querySelectorAll('input[name="nationalid"]');
        nationalIdInputs.forEach(input => {
            input.addEventListener('input', function() {
                const nationalId = this.value.trim();
                if (nationalId.length !== 14 && nationalId.length > 0) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }

    // تهيئة حقول التاريخ
    function initDateFields() {
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');
        
        if (daySelect && monthSelect && yearSelect) {
            // ملء الأيام (1-31)
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
            
            // ملء السنوات (من 1920 إلى 2025)
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= 1920; i--) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }
        }
    }

    // وظائف حفظ البيانات في قاعدة البيانات
    function saveDoctorData() {
        const doctorData = {
            name: document.getElementById('userName').value,
            age: document.getElementById('id-user').value,
            email: document.getElementById('userEmail').value,
            phone: document.getElementById('your-phone').value,
            experience: document.getElementById('id-experience').value,
            hospital: document.getElementById('hospital-numberr').value,
            doctorType: document.getElementById('doctor-status').value,
            department: document.getElementById('doctordepartment').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };
        
        console.log('حفظ بيانات الدكتور:', doctorData);
        localStorage.setItem('doctorData', JSON.stringify(doctorData));
    }

    function savePatientData() {
        const nameInput = findPatientNameInput();
        const patientData = {
            name: nameInput ? nameInput.value : '',
            phone: document.getElementById('your-phone').value,
            nationalId: document.getElementById('id-national').value,
            hospital: document.getElementById('hospital-number').value,
            illness: document.getElementById('patient-illness').value,
            birthDate: {
                day: document.getElementById('day').value,
                month: document.getElementById('month').value,
                year: document.getElementById('year').value
            },
            address: document.getElementById('address').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        };
        
        console.log('حفظ بيانات المريض:', patientData);
        localStorage.setItem('patientData', JSON.stringify(patientData));
    }

    function saveStaffData() {
        const staffData = {
            name: document.getElementById('userName').value,
            phone: document.getElementById('your-phone').value,
            email: document.getElementById('userEmail').value,
            age: document.getElementById('id-user').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            hospital: document.getElementById('hospital-numberr').value,
            job: document.getElementById('hospital-job').value
        };
        
        console.log('حفظ بيانات الموظف:', staffData);
        localStorage.setItem('staffData', JSON.stringify(staffData));
    }

    // إضافة وظائف للقائمة المتحركة في صفحات عبدو
    function initMenuToggleForAllPages() {
        // البحث عن جميع أزرار القائمة في جميع الصفحات
        const menuButtons = document.querySelectorAll('#menu');
        const actionMenus = document.querySelectorAll('#action');
        
        menuButtons.forEach((menuButton, index) => {
            if (menuButton && actionMenus[index]) {
                menuButton.addEventListener('click', function() {
                    actionMenus[index].classList.toggle('active');
                });
            }
        });
    }
}); 

// وظائف القائمة المنسدلة
// دالة موحدة لإدارة جميع القوائم المنسدلة
function setupDropdown(menuId, actionsId) {
    // الحصول على العناصر
    const menu = document.getElementById(menuId);
    const actions = document.getElementById(actionsId);
    
    // التحقق من وجود العناصر
    if (!menu || !actions) {
        console.error(`لم يتم العثور على العناصر: ${menuId}, ${actionsId}`);
        return;
    }
    
    // إضافة حدث النقر على زر القائمة
    menu.addEventListener("click", (event) => {
        event.stopPropagation(); // منع انتشار الحدث
        toggleMenu(menu, actions);
    });
    
    // إضافة حدث النقر على المستند لإغلاق القائمة
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !actions.contains(event.target)) {
            closeMenu(menu, actions);
        }
    });
    
    // إضافة أحداث للروابط داخل القائمة
    const links = actions.querySelectorAll("a"); 
    links.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu(menu, actions); 
        });
    });
}

// دالة لتبديل حالة القائمة (فتح/إغلاق)
function toggleMenu(menu, actions) {
    menu.classList.toggle("is-active");
    actions.classList.toggle("is-active");
}

// دالة لإغلاق القائمة
function closeMenu(menu, actions) {
    menu.classList.remove("is-active");
    actions.classList.remove("is-active");
}

// تهيئة جميع القوائم المنسدلة
document.addEventListener('DOMContentLoaded', function() {
    // إعداد القوائم للطبيب، المريض، والموظف
    setupDropdown("menu", "action");     // المريض
    
    // تهيئة AOS مرة واحدة فقط
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
});