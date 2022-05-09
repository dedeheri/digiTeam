<!-- endpoint -->

    1.http://localhost:1234/v1/auth/registration
    2.http://localhost:1234/v1/auth/login
    3.http://localhost:1234/v1/auth/token?exp={token}

<!--Alur  -->

1. Registrasi
   Buat akun dengan username tanpa sepasi, jika username menggandung spasi, api akan menggeluarkan pesan "username tidak boleh mengandung spasi", jika username sudah terdaftar api akan menggeluarkan pesan "Username sudah terdaftar". Role diatur dalam String contoh : pengguna, admin. Jika body json kosong (username, role) api akan menggeluarkan pesan "Username tidak boleh kosong" dan "role tidak boleh kosong".

2. Login
   Masukan username yang sudah di buat, jika username tidak terdaftar api akan menggeluarkan pesan "Username tidak tersedia", masukan password yang sudah ter-generate dibagian keluaran registrasi, jika password salah api akan menggeluarkan pesan "Kata sandi salah". Jika body json kosong (username, role) api akan menggeluarkan pesan "Username tidak boleh kosong" dan "kata sandi tidak boleh kosong".

3. Token
   Masukan token yang sudah didapatkan dalam keluaran api di bagian login, contoh : http://localhost:1234/v1/auth/token?exp=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlZGVoZXJpIiwiaWF0IjoxNjUyMTIwMjUzLCJleHAiOjE2NTIxMjAzMTN9.k8nRUmfSQSLqYLUqMNY7tCYorXdhwWUyPJDs-7Go0tY.
   Jika validasi token berhasil, api akan menggeluarkan pesan is_valid : true, username, expired_at, dalam kasus ini, token (JWT) di atur dalam waktu 5 menit dan jika token keduarsa, api akan menggeluarkan pesan is_valid : false dan jika query tidak dimasukan api akan menggeluarkan pesan is_valid : false
