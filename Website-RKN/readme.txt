sejarah perusahaan (belum)
halaman brand banner (sudah)
halaman kegiatan (sudah)
halaman brand nagkring seblak (belum)
visi misi & nilai (sudah)
alamat RKN (sudah)
logo RKN (sudah)
halaman kegiatan (sudah)


cik emam - bocinyoi - sbu - nagkrindseblak - oki pokki

 bikin kolaborasi sampai ramdadan_50


 














 kode afliator select 49 orang 


 (async () => {
    let target = 49;
    let currentChecked = 0;
    
    console.log("Memulai pencarian kreator... Mohon tunggu.");

    // Fungsi untuk scroll otomatis
    const autoScroll = async () => {
        window.scrollBy(0, 800);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Tunggu 1.5 detik agar data load
    };

    while (currentChecked < target) {
        // Ambil semua baris kreator yang muncul di layar
        const rows = document.querySelectorAll('tr, [role="row"], .index_creatorRow__kS7vX');
        
        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            const isFood = text.includes("makanan");
            const isNotInvited = !text.includes("pernah diundang") && !text.includes("diundang");
            const checkbox = row.querySelector('input[type="checkbox"]');

            if (isFood && isNotInvited && checkbox && !checkbox.checked && currentChecked < target) {
                checkbox.click();
                currentChecked++;
                console.log(`Tercentang: ${currentChecked} orang.`);
            }
        });

        if (currentChecked < target) {
            await autoScroll();
            
            // Cek jika sudah sampai paling bawah halaman tapi belum cukup
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("Sudah mencapai ujung halaman.");
                break;
            }
        }
    }

    console.log(`Selesai! Berhasil memilih ${currentChecked} kreator.`);
    alert(`Berhasil memilih ${currentChecked} kreator. Silakan klik tombol 'Undang Sekaligus'.`);
})();