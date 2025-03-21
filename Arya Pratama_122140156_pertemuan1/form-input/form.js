function validasiEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

document.getElementById("bt-submit").addEventListener("click", function(event) {
    event.preventDefault(); // Mencegah form dari submit default

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let pesanError = ""; // Variabel untuk mengumpulkan pesan kesalahan

    // Validasi nama
    if (nama.length <= 3) {
        pesanError += `<p class="text-red-500 pl-4">* Nama yang diinput harus lebih dari 3 karakter!</p>`;
    }

    // Validasi email
    if (!validasiEmail(email)) {
        pesanError += `<p class="text-red-500 pl-4">* Email yang diinput tidak valid!</p>`;
    }

    // Validasi password
    if (password.length < 8) {
        pesanError += `<p class="text-red-500 pl-4">* Password yang diinput harus lebih dari 8 karakter!</p>`;
    }

    // Tampilkan pesan kesalahan atau keberhasilan
    if (pesanError !== "") {
        document.getElementById("output").innerHTML = pesanError;
    } else {
        document.getElementById("output").innerHTML = `<p class="text-green-500">Registrasi Berhasil!</p>`;
        //Reset
        document.getElementById("nama").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
});