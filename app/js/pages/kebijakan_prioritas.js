/* ============================================
   KinerjaKu Next — Dukungan Kebijakan Prioritas
   ============================================ */

const KebijakanPrioritasPage = {
  state: {
    page: 1,
    perPage: 20,
    searchQuery: '',
    filterYear: 'all',
    filterCategory: 'all',
    filterStatus: 'all'
  },

  data: [
    {
      "tahun": "2025",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Bekasi",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Dirjen PB",
      "noPihak1": "04/DJPB/KKP/NK/VI/2025",
      "pihak2": "Bupati Bekasi",
      "noPihak2": "100.3.7.1/91/DISKAN/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "06/25/2025",
      "tanggalSelesai": "06/25/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1yFOr8phQ1yoq8u_Pc9Q06SbaetUcS2PL/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Karawang",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Dirjen PB",
      "noPihak1": "02/DJPB/KKP/NK/VI/2025",
      "pihak2": "Bupati Karawang",
      "noPihak2": "100.2.2/1618/KD",
      "masaBerlaku": "5",
      "tanggalMulai": "06/26/2025",
      "tanggalSelesai": "06/26/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1inYJlnvmi20SrNJ9p2Tb482pvMnJhM7X/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Subang",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Dirjen PB",
      "noPihak1": "03/DJPB/KKP/NK/VI/2025",
      "pihak2": "Bupati Subang",
      "noPihak2": "Hm.03/NK.40-KSD/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "06/27/2025",
      "tanggalSelesai": "06/27/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1f1YgU1Hh81WXEggwuCF4ZM8_fgIg7sy0/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Indramayu",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Dirjen PB",
      "noPihak1": "01/DJPB/KKP/NK/VI/2025",
      "pihak2": "Bupati Indramayu",
      "noPihak2": "100.3.7.1/NK.02/TAPEM/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "06/28/2025",
      "tanggalSelesai": "06/28/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1h0sJ4g4k8V8Vq63kkpeo5Hakwiwpepn5/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Ormas",
      "mitra": "Perkumpulan Prakarsa Laut Berkelanjutan dan Berkeadilan Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "03/MEN-KP/NK/VI/2025",
      "pihak2": "CEO Perkumpulan Prakarsa Laut Berkelanjutan dan Berkeadilan Indonesia",
      "noPihak2": "LEM.003.05/IOJI/VI/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "06/05/2025",
      "tanggalSelesai": "05/06/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1wgtaZgmqkkGFrZrr5AaDMBk-XAY7yHQ6/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "BUMN",
      "mitra": "PT Bank Negara Indonesia (PERSERO) Tbk",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ/KKP/PKS/VI/2025",
      "pihak2": "Drektur Consumer Banking PT Bank Negara Indonesia (PERSERO) Tbk",
      "noPihak2": "DIR/409.1",
      "masaBerlaku": "3",
      "tanggalMulai": "06/02/2025",
      "tanggalSelesai": "02/06/2028",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1misbFUIptXm-PlaqrGmjQ2egsfzY_1g9/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "K/L",
      "mitra": "Badan Gizi Nasional",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "",
      "pihak2": "Kepala BGN",
      "noPihak2": "",
      "masaBerlaku": "5",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2025",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Lingkungan Hidup",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "",
      "pihak2": "Menteri KLH",
      "noPihak2": "",
      "masaBerlaku": "5",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2025",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Pemberdayaan Perempuan dan Perlindungan Anak",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/IV/2025",
      "pihak2": "Menteri KPPPA",
      "noPihak2": "022/Men/KL.01/04/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "04/21/2025",
      "tanggalSelesai": "04/21/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/17oCRxe1z0tadWa_yuwTFeR6qyXHuy6tC/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "K/L",
      "mitra": "PP Muhammadiyah",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/NK/III/2025",
      "pihak2": "Ketua Umum PP Muhammadiyah",
      "noPihak2": "051/I.0/A/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "03/06/2025",
      "tanggalSelesai": "03/06/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1pleqV9cvj6av4JmghUkd-56CaAcXuDuA/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Muslim Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ/KKP/KB/II/2025",
      "pihak2": "Rektor UMI",
      "noPihak2": "0503/C.06/UMI/II/2025",
      "masaBerlaku": "3",
      "tanggalMulai": "02/24/2025",
      "tanggalSelesai": "02/24/2028",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1EQdaqQidTCyiCOwZo67bUi5Yv8pGzF6s/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Pelindungan Pekerja Migran Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/I/2025",
      "pihak2": "Menteri KP2MI/BP2MI",
      "noPihak2": "MoU.2/02.01/KS.01/I/2025",
      "masaBerlaku": "5",
      "tanggalMulai": "01/20/2025",
      "tanggalSelesai": "01/20/2030",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/111e7PiUjnim182fvuFnySxeJzqn285B9/view?usp=drive_link"
    },
    {
      "tahun": "2025",
      "kategoriMitra": "Ormas",
      "mitra": "RARE",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "0",
      "pihak2": "Vise President RARE",
      "noPihak2": "0",
      "masaBerlaku": "3",
      "tanggalMulai": "01/13/2025",
      "tanggalSelesai": "01/13/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/15XNINY39oPclRkTMToN467O5HFqsyfyn/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Badan Karantina Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "11/MEN-KP/KB/IV/2024",
      "pihak2": "Ka Badan Karantina Indonesia",
      "noPihak2": "3292/HK.220/A/4/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "4/29/2024",
      "tanggalSelesai": "4/29/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1TYBodEzBMyVgwHgL2cl6NTE9l5TjA6d5/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "BRIN",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "10/MEN-KP/KB/IV/2024",
      "pihak2": "Ka BRIN",
      "noPihak2": "32/I/KS/04/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "4/30/2024",
      "tanggalSelesai": "4/30/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1FH7zoKuCZLBoD2u6OjLnNwOLi2v526pT/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Padjadjaran",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "09/MEN-KP/KB/III/2024",
      "pihak2": "Rektor Universitas Padjadjaran",
      "noPihak2": "152/UN6.RKT/HK.07.00/2024 - MOU",
      "masaBerlaku": "3",
      "tanggalMulai": "05/03/24",
      "tanggalSelesai": "05/03/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1FH7zoKuCZLBoD2u6OjLnNwOLi2v526pT/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "08/MEN-KP/KB/II/2024",
      "pihak2": "Men PUPR",
      "noPihak2": "01/PKS/M/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "2/13/2024",
      "tanggalSelesai": "2/13/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1CvmRYNL_7U5v8CGOkqN2eW-1cEsSKtbH/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Pertanian",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/II/2024",
      "pihak2": "Men Pertanian",
      "noPihak2": "01/MoU/HK220/M/02/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "2/13/2024",
      "tanggalSelesai": "2/13/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1cYKc4vlBm5iT44NrFOp6RsBRiGbpq7ur/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Syiah Kuala",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "06/MEN-KP/KB/II/2024",
      "pihak2": "Rektor Universitas Syiah Kuala",
      "noPihak2": "43/UN11/HK.02.03//2024",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1ekvWcJuPOuJz1_0Bn7p1n9hH8c7p2aTe/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Diponegoro",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "12/MEN-Kp/NK/V/2024",
      "pihak2": "Rektor Universitas Diponegoro",
      "noPihak2": "80/UN7.A/KS/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "5/27/2024",
      "tanggalSelesai": "5/27/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/18kpRu_0IYRuS8vNtSpIXYtB0_o15OPFK/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Badan Keamanan Laut (Bakamla)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "13/MEN-KP/KB/X/2024",
      "pihak2": "Kepala Bakamla",
      "noPihak2": "KS.01/15/X/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "10/14/2024",
      "tanggalSelesai": "10/14/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1tiZDjOyUer9sETwryZWN7gzkw4UmBEcP/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Dalam Negeri",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/II/2024",
      "pihak2": "Menteri Dalam Negeri",
      "noPihak2": "500.5.1/653/SJ",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1LE1evabMX9j4mj2S-P5naQBPJPeCvzmC/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Agraria dan Tata Ruang/ATR BPN",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/II/2024",
      "pihak2": "Menteri ATR/BPN",
      "noPihak2": "3/SKB-HK.03.01/II/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1d6lZnAoRVRWr1UvTTAFKD3jRnvTocyls/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Badan Pengawasan Keuangan dan Pembangunan )BPKP)",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "03/MEN-KP/KB/II/2024",
      "pihak2": "Kepala BPKP",
      "noPihak2": "HK.02/MoU-1/K/D1/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1OKPe7-nMeh42t_eLWNU9kwLx8A9YQhRC/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Hasanuddin",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "04/MEN-KP/KB/II/2024",
      "pihak2": "Rektor",
      "noPihak2": "04360/UN4.1/HK.07/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1I_r578tnDT6d0EPbsyTKWBZ5wmcCWwrn/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Brawijaya",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/II/2024",
      "pihak2": "Rektor",
      "noPihak2": "17.1/UN10.A0406/HK.07.00.2/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "05/02/24",
      "tanggalSelesai": "05/02/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1-BXr8xGdLNQOWk8vsfkyb5jw1wNR6Md0/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Badan Kependudukan dan Keluarga Berencana Nasional (BKKBN)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "14/MEN-KP/KB/IV/2024",
      "pihak2": "Plt. Kepala BKKBN",
      "noPihak2": "20/KSM/G2/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "10/14/2024",
      "tanggalSelesai": "10/14/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1tMS6RfpAV4d2QDG9-5m__jGcBMsH8UNd/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan WWF Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ/KKP/KB/X/2024",
      "pihak2": "Ketua Badan Pengurus Yayasan WWF Indonesia",
      "noPihak2": "158/WWF-ID/LGL-MOU/X/FY25/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "10/18/2024",
      "tanggalSelesai": "10/18/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1ZoWccBGTDCLJGRGbSyV659Vo2wkRt9yt/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Badan Pengatur Hilir Minyak dan Gas Bumi",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ/KKP/PKS/XII/2024",
      "pihak2": "Kepala Badan Pengatur Hilir Minyak dan Gas Bumi",
      "noPihak2": "20.Pj/KS.01/BPH/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "12/12/24",
      "tanggalSelesai": "12/12/29",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1lJ06qRLtc_N2Gh9IQ_sEg8kbUwZNut-Y/view?usp=drive_link"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "BUMN",
      "mitra": "PT Bank Mandiri (PERSERO) Tbk",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "16/MEN-KP/NK/X/2024",
      "pihak2": "Dirut PT Bank Mandiri (PERSERO) Tbk",
      "noPihak2": "DIR.MOU/23.A/2024",
      "masaBerlaku": "3",
      "tanggalMulai": "10/21/2024",
      "tanggalSelesai": "10/21/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Dd3MYViYz6EGHZg03WZ8ctxZ-rewNdic/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kepolisian Negara Republik Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Kapolri",
      "noPihak1": "NK/46/X/2024",
      "pihak2": "MKP",
      "noPihak2": "15/MEN-KP/KB/X/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "10/14/2024",
      "tanggalSelesai": "10/14/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1ILTV4Fqcbcbn_DjdcSRiL3er0jWRGcJd/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kejaksaan Republik Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "17/MEN-KP/NK/X/2024",
      "pihak2": "Jaksa Agung",
      "noPihak2": "9 Tahun 2024",
      "masaBerlaku": "3",
      "tanggalMulai": "10/31/2024",
      "tanggalSelesai": "10/31/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1IAv4BFC1ry37RZn0QegPv9ICqoNM3wCT/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Desa dan Pembangunan Daerah Tertinggal",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MDPDT",
      "noPihak1": "09/M/HKM.07.01/XI/2024",
      "pihak2": "MKP",
      "noPihak2": "18/MEN-KP/KB/XI/2024",
      "masaBerlaku": "5",
      "tanggalMulai": "11/25/2024",
      "tanggalSelesai": "11/25/2029",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1eN0Fo--zwj_UlCvMf5FW_ouqSU-ZqH98/view?usp=sharing"
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "1. Fakultas Ilmu Budaya, UGM",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2024",
      "kategoriMitra": "Universitas",
      "mitra": "Fakultas Ilmu Budaya UGM, UI, dan UnHas",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PKRL",
      "noPihak1": "11/DJPKRL/KS.320/VIII/2024",
      "pihak2": "Dekan FIB UGM, UI, UnHas",
      "noPihak2": "2633/UN1.FIB/Sek.Dek/2024",
      "masaBerlaku": "3",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "Kemenko PMK",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Asdep Jamsos",
      "noPihak1": "002/PKS/DEP.1/KEMENKO/PMK/02/2023",
      "pihak2": "Plt. Kapusdatin",
      "noPihak2": "B.693/SJ.7/KS.320/II/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "2/16/2023",
      "tanggalSelesai": "2/16/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1LgXZbKhTzmZCgax4leAqTDtlunBHE7iH/view?usp=share_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Bangka",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Bupati Bangka",
      "noPihak1": "100.3.7/564/DIPERKAN/2023",
      "pihak2": "Ka BKIPM",
      "noPihak2": "B.601/BKIPM/KS.310/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1OtrdlYu5vW_roCvzIgOU6dV5bMO6iI16/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Bangka Selatan",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Bupati Bangka Selatan",
      "noPihak1": "523/01/DPPP/2023",
      "pihak2": "Ka BKIPM",
      "noPihak2": "B.603/BKIPM/KS.310/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1OuGfwHLl1PM1WBJhcWCEPKAKcGSUzXyM/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Bangka Tengah",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Bupati Bangka Tengah",
      "noPihak1": "415.4/26/SETDA.PEM/2023",
      "pihak2": "Ka BKIPM",
      "noPihak2": "B.602/BKIPM/KS.310/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1-ywRsZJmOcRi9q03VfzPy1ntVea4Cyd-/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Belitung Timur",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Bupati Belitung Timur",
      "noPihak1": "007/NK/I/BT/2023",
      "pihak2": "Ka BKIPM",
      "noPihak2": "B.606/BKIPM/KS.310/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1eIMRTrhlOdQAUp_UTj5pUAT_mw1tYJO-/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "BUMN",
      "mitra": "Pertamina Patra Niaga",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "01/PT/KKP/PKS/II/2023",
      "pihak2": "Dirut Pertamina Patra Niaga",
      "noPihak2": "KTR-009/PNA000000/2023-SO",
      "masaBerlaku": "3",
      "tanggalMulai": "02/02/23",
      "tanggalSelesai": "02/02/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1oBThu56YJ86LEB3XoJjsLHEr6lbFaq8R/view?usp=share_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "GISLI (Gerakan Ingat Selamat Layar Indonesia)",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PDS",
      "noPihak1": "01/PDSPKP/KKP/PKS/VII/2023",
      "pihak2": "Ketua GISLI",
      "noPihak2": "K/014/S01-GSL/EXT-PDSPKP/VII/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/25",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1fu6OiQS2dwLRj6NZVQckq4R_ng5LtqTn/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemda Wakatobi",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Dirjen PDS",
      "noPihak1": "02/PDSPKP/KKP/PKS/VII/2023",
      "pihak2": "Bupati Wakatobi",
      "noPihak2": "420/NK/08/PEMKAB/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "7/18/2023",
      "tanggalSelesai": "7/18/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1sCoyLS85G3gk7qiOUMBlpBnUkH4ZrEos/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "GISLI (Gerakan Ingat Selamat Layar Indonesia)",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PDS",
      "noPihak1": "01/PDSPKP/KKP/PKS/VII/2023",
      "pihak2": "Ketua GISLI",
      "noPihak2": "K/014/S01-GSL/EXT-PDSPKP/VII/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/25",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1fu6OiQS2dwLRj6NZVQckq4R_ng5LtqTn/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Pesisir Lestari",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Dirjen PKRL",
      "noPihak1": "02/SJ/KKP/KB/XI/2023",
      "pihak2": "Ketua Yayasan Pesisir Lestari",
      "noPihak2": "017/KB/YPL/XI/2013",
      "masaBerlaku": "5",
      "tanggalMulai": "11/27/2023",
      "tanggalSelesai": "11/27/2028",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1CRLF67IYm7WphabUlbIgzxdBgmQcjXQg/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Belitung",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Ka BKIPM",
      "noPihak1": "B.605/BKIPM/KS.310/VII/2023",
      "pihak2": "Bupati Belitung",
      "noPihak2": "181/003/NK/I/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/15pmUia1zHU6A8sSYxtyzWfAm_9O8XI1b/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Bangka Barat",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Ka BKIPM",
      "noPihak1": "B.604/BKIPM/KS.310/VII/2023",
      "pihak2": "Bupati Bangka Barat",
      "noPihak2": "415.4/06/SETDA/II/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1qPKK6GNYkG-PU0hd0HsOwBtwW_9SSLen/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Perikanan Kabupaten Belitung Timur",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.529/PKS-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Ka Dinas Perikanan Kabupaten Belitung Timur",
      "noPihak2": "KS.300/001/DP-III/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/15FI3Zrn15_Q4p3NKTOM_Dvchj9nrLc-m/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Kelautan dan Perikanan Kota Pangkalpinang",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.524/PKS-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Ka Dinas Kelautan dan Perikanan Kota Pangkalpinang",
      "noPihak2": "188.3/042/KEP/DKP/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1SkiM5kjc7kXO49YJIa205AVsH8TW9QAN/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Perikanan Kabupaten Belitung",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.526/RK-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Ka Dinas Perikanan Kabupaten Belitung",
      "noPihak2": "523/699/Perik-RK/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1UjQB6Yevf7N_CatXLHe1k4OERtzL-11K/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Perikanan Kabupaten Bangka Tengah",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.528/PKS-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Ka Dinas Perikanan Kabupaten Bangka Tengah",
      "noPihak2": "415.4/354/DIPERKAN/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1sL0vZSifJ_wlM0NkNOi-m0_KlkgcLcQG/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Pertanian, Pangan, Perikanan Kab Bangka Selatan",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.525/PKS-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Plt. Ka Dinas Pertanian, Pangan, Perikanan Kab Bangka Selatan",
      "noPihak2": "523/02/DPPP/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1c7u4zStAKyTrhBId9cCKSR3vaKk0xI7S/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Perikanan Kabupaten Bangka Barat",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.527/PKS-SKIPM.PKP/KS.320/VII/2023",
      "pihak2": "Ka Dinas Perikanan Kabupaten Bangka Barat",
      "noPihak2": "000.4.7.2/121/DKP/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Xuw4joblkywptVbpDpzQTA2Jc8MEr82k/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Perikanan Kabupaten Bangka",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka SKIPM Pangkalpinang",
      "noPihak1": "B.523/PKS-SKIPM.PKP/KS.320/VII/2024",
      "pihak2": "Ka Dinas Perikanan Kabupaten Bangka",
      "noPihak2": "523/292/DINPERKAN/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/163yn6G8UwWwIUGXOAoHiCADik06AtiL7/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas Ketahanan Pangan, Kelautan dan Pertanian, PemProv DKI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kadis Ketahanan Pangan, Kelautan dan Pertanian, Pemprov DKI",
      "noPihak1": "986/LI.15.00",
      "pihak2": "Sesditjen PSDKP",
      "noPihak2": "01/DJPSDKP/KKP/PKS/II/2023",
      "masaBerlaku": "5",
      "tanggalMulai": "2/17/2023",
      "tanggalSelesai": "2/17/2028",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1r_3iV9VxoTulPyme-nNnOQojeZ1wpRol/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "Perkumpulan Saya Perempuan Anti Korupsi (SPAK)",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kapuslatluh",
      "noPihak1": "26/BRSDMKP/KKP/PKS/VI/2023",
      "pihak2": "Direktur",
      "noPihak2": "183/PKS-SPAK/VI/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "6/16/2023",
      "tanggalSelesai": "6/16/2025",
      "status": "Berlaku",
      "linkDokumen": ""
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "Perkumpulan Saya Perempuan Anti Korupsi",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "KaPusLatLuhKP",
      "noPihak1": "26/BRSDMKP/KKP/PKS/VI/2023",
      "pihak2": "Direktur",
      "noPihak2": "183/PKS-SPAK/VI/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "6/16/2023",
      "tanggalSelesai": "6/16/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1XLw5A4RY75s2PMtbVlSjQnBwn2LIGuNN/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "Badan Inteljen Nasional",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/IV/2023",
      "pihak2": "Kepala BIN",
      "noPihak2": "MoU-03/IV/2023",
      "masaBerlaku": "5",
      "tanggalMulai": "03/04/23",
      "tanggalSelesai": "03/04/28",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1zTDqHphJ82GGfjmrUba4Hp_HBbkgHzT_/view?usp=share_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "Kemenko Marves",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2023",
      "kategoriMitra": "BUMN",
      "mitra": "PT Bank Rakyat Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "03/MEN-KP/K/III/2023",
      "pihak2": "Dirut PT BRI",
      "noPihak2": "B.0446-DIR/INS/03/2023",
      "masaBerlaku": "5",
      "tanggalMulai": "06/03/23",
      "tanggalSelesai": "06/03/28",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/12qsTzZK2todQb6vHcx55U-XlMauSW0Zx/view?usp=share_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "IKA UNDIP",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/II/2023",
      "pihak2": "Ketua Umum IKA UNDIP",
      "noPihak2": "05/MOU-DPP IKA UNDIP/II/2023",
      "masaBerlaku": "5",
      "tanggalMulai": "2/25/2023",
      "tanggalSelesai": "2/25/2028",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1dpyB4_FFmF23RARKrz4sY58LLNNJpwnH/view?usp=share_linkDokumen"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "Kemen BUMN",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/11/2023",
      "pihak2": "Menteri BUMN",
      "noPihak2": "MOU-01/MBU/02/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "02/02/23",
      "tanggalSelesai": "02/02/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1A-FGOQAqzx4P6Hd-QC4-9uUm7INd6Qx3/view?usp=share_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "BPOM",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "06/MEN-KP/KB/VII/2023",
      "pihak2": "Kepala BPOM",
      "noPihak2": "KS.01.01.1.2.07.03.23",
      "masaBerlaku": "5",
      "tanggalMulai": "03/07/23",
      "tanggalSelesai": "03/07/28",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/163Jb5FQS9xvRtlhjFsrwkEY2-hPonfoC/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Bidang Perkoperasian KemenkopUKM",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Plt. Dirjen PT",
      "noPihak1": "20/PT/KKP/PKS/VIII/2023",
      "pihak2": "Deputi Bidang Perkoperasian",
      "noPihak2": "3/PKS/D.1/VIII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "07/08/23",
      "tanggalSelesai": "07/08/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1ChJPMaPykM7UWxyZXo226LTAZnJgSO9E/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkab Wakatobi",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PB",
      "noPihak1": "04/DJPB/KKP/PKS/VIII/2023",
      "pihak2": "Bupati Wakatobi",
      "noPihak2": "420/PKS/11/PEMKAB/VIII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "10/08/23",
      "tanggalSelesai": "10/08/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1zWQX7FeDHre4PJGW3kPALIW9kZvoo0PX/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Rekam Jejak Alam Nusantara",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekretaris DJPSDKP",
      "noPihak1": "02/DJPSDKP/KKP/PKS/III/2023",
      "pihak2": "Ketua Yayasan",
      "noPihak2": "47/SPK/YRJAN/III/2023",
      "masaBerlaku": "2",
      "tanggalMulai": "01/03/23",
      "tanggalSelesai": "11/30/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1IlUo539cwr2Dha4Mpao4yqwZ15QZfQG9/view?usp=drive_link"
    },
    {
      "tahun": "2023",
      "kategoriMitra": "Pemda",
      "mitra": "Pemkot Pangkalpinang",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Walikota Pangkalpinang",
      "noPihak1": "10/NK/DKP/VII/2023",
      "pihak2": "Ka BKIPM",
      "noPihak2": "B.600/BKIPM/KS.310/VII/2023",
      "masaBerlaku": "3",
      "tanggalMulai": "06/07/23",
      "tanggalSelesai": "06/07/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1bVMKmRfqEjWmNKImss6eLTv8Un7mIYqB/view?usp=drive_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Pemda",
      "mitra": "Pemprov KalBar",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "Gubernur",
      "noPihak1": "97/NK-PEM/2022",
      "pihak2": "Dirjen PSDKP",
      "noPihak2": "01/PSDKP/KKP/KB/VII/2022",
      "masaBerlaku": "3",
      "tanggalMulai": "7/29/2022",
      "tanggalSelesai": "7/29/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1qqAgquiuFjpcjewmXY-NcWwUCWMTtevF/view?usp=drive_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Universitas",
      "mitra": "LPPM Universitas Bengkulu",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. Loka PSPL Serang - Ditjen PRL",
      "noPihak1": "976/LPSPL.2/PRL/KKP/PKS/IV/2022",
      "pihak2": "Kepala PLPPM Univ. Bengkulu",
      "noPihak2": "921/UN30.15/KS/2022",
      "masaBerlaku": "3",
      "tanggalMulai": "06/04/22",
      "tanggalSelesai": "06/04/25",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Sgii8PsBdTNsPxFV7CHfwspLGuzPkTQZ/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Bidang Perkoperasian",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PB",
      "noPihak1": "03/DJPB.KKP/PKS/11/2022",
      "pihak2": "Deputi Bidang Perkoperasian",
      "noPihak2": "03/PKS/D.1/11/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "07/02/22",
      "tanggalSelesai": "07/02/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1CY3Io9Lt8x7HE4GieAOcsb83_xXkzFui/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Universitas",
      "mitra": "Fakultas Pertanian UGM",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Plt. Kepala PP Kejawanan DJPT",
      "noPihak1": "47/PPNK/HK.320/1/2022",
      "pihak2": "Dekan Faperta UGM",
      "noPihak2": "13/UN1/FPN/HK/1/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "07/01/22",
      "tanggalSelesai": "07/01/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1kyot_I3unGK7wUoCe380QF0y27l3a3nP/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "K/L",
      "mitra": "Kemenkominfo",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "09/MEN-KP/KB/XI/2022",
      "pihak2": "Menkominfo",
      "noPihak2": "09/MEN-KP/KB/XI/2022",
      "masaBerlaku": "3",
      "tanggalMulai": "11/22/2022",
      "tanggalSelesai": "11/22/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/151Uu4i3wn_QyJiqr68gG8Asr-EVYf_AZ/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Ketenagakerjaan",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "08/MEN-KP/KB/IX/2022",
      "pihak2": "Menteri Tenaga Kerja",
      "noPihak2": "M/4/KS.06/IX/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "9/30/2022",
      "tanggalSelesai": "9/30/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1W6J0RI_ThFrPuD7F4hvvyrYOQkz-Q9wF/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "K/L",
      "mitra": "Kemendikbudristek",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/VIII/2022",
      "pihak2": "Menteri DIkbudristek",
      "noPihak2": "07.1/VII/NK/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "05/08/22",
      "tanggalSelesai": "05/08/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1W6J0RI_ThFrPuD7F4hvvyrYOQkz-Q9wF/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas",
      "mitra": "Kamar Dagang dan Industri Indonesia (KADIN)",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "06/MEN-KP/KB/IV/2022",
      "pihak2": "Ketua Umum KADIN",
      "noPihak2": "MOU/036/DP/IV/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "06/04/22",
      "tanggalSelesai": "06/04/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1CN_28o13ODek0z-0Tx3idt3SKcBfgwvl/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "K/L",
      "mitra": "BASARNAS",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "04/MEN-KP/II/2022",
      "pihak2": "Kepala BASARNAS",
      "noPihak2": "MOU-56/KS.01.01/II/BSN-2022",
      "masaBerlaku": "5",
      "tanggalMulai": "2/23/2022",
      "tanggalSelesai": "2/23/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1sC_ELlGgjyUswc-xf4DkJ-dZ-aj5Rc2P/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas",
      "mitra": "Pengurus Besar Nahdlatul Ulama",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "03/MEN-KP/KB/1/2022",
      "pihak2": "Ketua Umum PBNU",
      "noPihak2": "72/A.11.03/01/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "1/31/2022",
      "tanggalSelesai": "1/31/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Sqo_OaF2Q5_oPbY5X4IXZ1SZvaSDurlx/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "BUMN",
      "mitra": "PT Bank Negara Indonesia (Persero) TBK",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/I/2022",
      "pihak2": "Dirut PT BNI Persero",
      "noPihak2": "DIR/049",
      "masaBerlaku": "5",
      "tanggalMulai": "1/20/2022",
      "tanggalSelesai": "1/20/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1hbx2Eml7zZkyXmYABLa1IqctimJ0ITLC/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "BUMN",
      "mitra": "PT Pos Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "05/SJ/KKP/KB/XI/2022",
      "pihak2": "Dirut PT Pos Indonesia",
      "noPihak2": "MOU.297/DIRUT/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "11/30/2022",
      "tanggalSelesai": "11/30/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1n5Q9-oE9vINSvIcFzO5sN72myfD1_HOG/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Hang Tuah",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ/KKP/KB/XI/2022",
      "pihak2": "Rektor Universitas Hang Tuah",
      "noPihak2": "B/83/UHT.AO/XI/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "11/21/2022",
      "tanggalSelesai": "11/21/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1-1XfebTQ6e55pp-P9QUu998OqVOdL9VC/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "BUMN",
      "mitra": "PT Bank Negara Indonesia (Persero) TBK",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "05/SJ/KKP/PKS/XI/2022",
      "pihak2": "Direktur Institutional Banking PT BNI",
      "noPihak2": "DIR/1044",
      "masaBerlaku": "3",
      "tanggalMulai": "11/21/2022",
      "tanggalSelesai": "",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1RKpEINqbiGHGJBZMrYBxiwuGNOnMcl94/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas Asing",
      "mitra": "Marine Steward Council",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "Regional Director Asia Pacific",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "10/17/2022",
      "tanggalSelesai": "10/17/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1XOGsM4XdemffQT_Ak_uOC9Xld4jAxLUn/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Universitas",
      "mitra": "Fakultas Hukum Universitas Diponegoro",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ/KKP/PKS/X/2022",
      "pihak2": "Dekan FH Undip",
      "noPihak2": "08/UN7.F1/KS/X/2022",
      "masaBerlaku": "3",
      "tanggalMulai": "10/14/2022",
      "tanggalSelesai": "10/14/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1HHPKDy2jfVJUK7Q9RwRXoswA0MXvdoVf/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "BUMN",
      "mitra": "PT Kereta Api Logistik",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "03/SJ/KKP/X/2022",
      "pihak2": "Dirut PT Kereta Api Logistik",
      "noPihak2": "0252/KALOG/PJ/10/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "12/10/22",
      "tanggalSelesai": "12/10/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1NsRb5xNREZE35SQ4Yp6SZUgWDpBQpWCP/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Strategi Konservasi Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ/KKP/KB/X/2022",
      "pihak2": "Direktur Yayasan Strategi Konservasi Indonesia",
      "noPihak2": "YSKI-001-0CT22",
      "masaBerlaku": "5",
      "tanggalMulai": "11/10/22",
      "tanggalSelesai": "11/10/27",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1zmw_OqrHty6Ma6VqLfAsXEkuGVWzrQyV/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas",
      "mitra": "Ikatan Wanita Pengusaha Indonesia (IWAPI)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ-KKP/KB/II/2022",
      "pihak2": "Ketua Umum IWAPI",
      "noPihak2": "009/IWAPI KKP/11/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "2/25/2022",
      "tanggalSelesai": "2/25/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1nBeAxCfT71IKS8oL1N9IBaTnATCUQAqF/view?usp=share_link"
    },
    {
      "tahun": "2022",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Masyarakat dan Perikanan Indonesia (MDPI)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/MEN-KP/KB/1/2022",
      "pihak2": "Ketua Yayasan MDPI",
      "noPihak2": "015/MDPI-KB/I/2022",
      "masaBerlaku": "5",
      "tanggalMulai": "1/13/2022",
      "tanggalSelesai": "1/13/2027",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1wXet7dWV_Qwf1DQ-g6Yb3wshS98Y5KF4/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "BPJS Ketenagakerjaan",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kapusdatin",
      "noPihak1": "03/SJ/KKP/PKS/XII/2021",
      "pihak2": "Direktur Kepesertaan",
      "noPihak2": "PErR/314/122021",
      "masaBerlaku": "3",
      "tanggalMulai": "12/20/2021",
      "tanggalSelesai": "12/20/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/14tfZ5M78iXGQL4xweEYpEThU3H6WRn4V/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "BPJS Ketenagakerjaan",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "05/PT/KKP/PKS/XII/2021",
      "pihak2": "Direktur Kepesertaan",
      "noPihak2": "PER/305/122021",
      "masaBerlaku": "3",
      "tanggalMulai": "10/12/21",
      "tanggalSelesai": "10/12/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1GhDoIuuzItwsVIV877w6Mn61Kk_XBYY3/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Bidang Perkoperasian",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Dirjen PKTN Kemdag",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PSDKP",
      "noPihak1": "09/PKS-DJPSDKP/X/2021",
      "pihak2": "Dirjen PKTN Kemdag",
      "noPihak2": "01/PKTN/PERJ/10/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "10/18/2021",
      "tanggalSelesai": "10/18/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1467Ff0DYmjMkySUQZPfjWdwXQZLcSV6o/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen Perlindungan Konsumen dan Tertib Niaga Kemendag",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PSDKP",
      "noPihak1": "09/PKS-DJPSDKP/X/2021",
      "pihak2": "Dirjen Perlindungan Konsumen dan Tertib Niaga",
      "noPihak2": "01/PKTN/PERJ/10/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "10/18/2021",
      "tanggalSelesai": "10/18/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1AsTlJZEgQRujh6m3Dhmycb415f79qFUJ/view?usp=drive_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Pemberantasan BNN \"D",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Ditjen Bea Cukai",
      "kategoriMitra": "Kemenkeu",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Ditjen Perhubungan Laut",
      "kategoriMitra": "Kemenhub",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "POLRI,Perjanjian Kerja Sama,Deputi Pemberantasan",
      "kategoriMitra": "BNN,PKS/51/IX//2021/BNN,Dirjen PSDKP,08/PKS_DJPSDKP/IX/2021,3,9/14/2021,9/14/2024,Tidak Berlaku,https://drive.google.com/file/d/1vAUKT2H5LBQWYrMkr2L6Gm1ST0rP0Vfm/view?usp=drive_link,,,,",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen Protokoler dan Konsuler Kemenlu",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen Protokoler dan Konsuler",
      "noPihak1": "PRJ/PK/00027/09/2021/64",
      "pihak2": "Dirjen PSDKP",
      "noPihak2": "07/PKS-DJPSDKP/VIII/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "8/19/2021",
      "tanggalSelesai": "8/19/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1FnfqeaZOZy9TMycodhe6fr1I5POKmyDr/view?usp=drive_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kejaksaan RI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Irjen KKP",
      "noPihak1": "12.13/ITJ/VIII/2021",
      "pihak2": "Jaksa Agung Muda Intelijen",
      "noPihak2": "B-1008/D/Dpp/08/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "8/13/2021",
      "tanggalSelesai": "8/13/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1U4XAldEfNR_ucjSSMIrJ0hamoh4zaF-d/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "BUMN",
      "mitra": "PT POS Indonesia",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kepala SKIPM Bandung",
      "noPihak1": "650/47.0/KS.300/V/2021",
      "pihak2": "Kepala Kantor Regional 5 POS",
      "noPihak2": "1495/ Regional5/Penjualan Korporat/0521",
      "masaBerlaku": "2",
      "tanggalMulai": "05/05/21",
      "tanggalSelesai": "05/05/23",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/19CE3R7ihv9oiiGGRWbqOF2i7fk9wS1KW/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Universitas",
      "mitra": "LPPM Unsoed",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ketua LPPM",
      "noPihak1": "T/1294/UN.23.18/HK.06.00/2021",
      "pihak2": "Sekretaris DJPSDKP",
      "noPihak2": "03/PKS-DJPSDKP/III/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "3/26/2021",
      "tanggalSelesai": "3/26/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1jkL6sr4HuPnQH4uwmXlXB2VJPMOhzdhR/view?usp=drive_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Pemda",
      "mitra": "Provinsi Jawa Barat",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kadis Kelautan dan Perikanan Jawa Barat",
      "noPihak1": "1655/HK.02.01/DKP",
      "pihak2": "Sekretaris DJPSDKP",
      "noPihak2": "02/PKS-DJPSDKP/III/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "3/18/2021",
      "tanggalSelesai": "3/18/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1jm95_5j3nXBJRgR2DIxLEMldomV3bNmN/view?usp=drive_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Perpusnas",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "11/MEN-KP/KB/XI/2021",
      "pihak2": "Kepala Perpusnas",
      "noPihak2": "484/PKS/XI.2021",
      "masaBerlaku": "3",
      "tanggalMulai": "9/92021",
      "tanggalSelesai": "09/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1eMIZ6e716tTT_pzmeu3LXk3wXije1JE2/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "BPS",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "MKP",
      "noPihak1": "13/MEN-KP/KB/XII/2021",
      "pihak2": "Kepala BPS",
      "noPihak2": "17/KS.M/15-XII/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "12/15/2021",
      "tanggalSelesai": "12/15/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1TnHQyyv48mjkOuFRomAMxt2xj6Sy5DaG/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "BMKG",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "12/MEN-KP/KB/XI/2021",
      "pihak2": "Kepala BMKG",
      "noPihak2": "Mou/016/KB/DN/XI/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "11/11/21",
      "tanggalSelesai": "11/11/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1NG8boaNpE3elruq3SIZzTtjcoNtRvpc2/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kemen Koperasi UKM",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "10/MEN-KP/KB/VIII/2021",
      "pihak2": "Men Koperasi UKM",
      "noPihak2": "17/KB/M.KUKM/VIII/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "8/21/2021",
      "tanggalSelesai": "8/21/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1bqZ02hK9_r2nOUvFw4nnDiQmD-IHk9-Z/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Pertanian",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "09/MEN-KP/KB/VII/2021",
      "pihak2": "Menteri Pertanian",
      "noPihak2": "06/MoU/HK.220/M/07/2021",
      "masaBerlaku": "4",
      "tanggalMulai": "7/28/2021",
      "tanggalSelesai": "7/28/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1voWuYnKwzOtsWlaJOF3f5KCYgporerCH/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kemenhub",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "08/MEN-KP/KB/VI/2021",
      "pihak2": "Menhub",
      "noPihak2": "PJ 98 Tahun 2021",
      "masaBerlaku": "",
      "tanggalMulai": "6/28/2021",
      "tanggalSelesai": "",
      "status": "Proses Peninjauan",
      "linkDokumen": "https://drive.google.com/file/d/1HfOods9-9Yn8hwN9uVJD3gL-2YXwAN1Z/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kejaksaan RI",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/VI/2021",
      "pihak2": "Jaksa Agung",
      "noPihak2": "9 Tahun 2021",
      "masaBerlaku": "3",
      "tanggalMulai": "6/21/2021",
      "tanggalSelesai": "6/21/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1q1-S9MN-3F9u_oOL4FAWRLx4RFBJ2Z-_/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Universitas",
      "mitra": "IPB",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "06/MEN-KP/KB/VI/2021",
      "pihak2": "Rektor IPB",
      "noPihak2": "75/IT3/HK.07.00-1/P/B/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "6/16/2021",
      "tanggalSelesai": "6/16/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1M-EZHhZR3uX8lq6MEUwOUqSZug291fTq/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Universitas",
      "mitra": "UGM",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/VI/2021",
      "pihak2": "Rektor UGM",
      "noPihak2": "1390/UN1.P/DIT-KAUI/HK/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "11/06/21",
      "tanggalSelesai": "11/06/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1X_plA_mqifg5BJbUcxVMA37Omo0rireJ/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Pemda",
      "mitra": "DKI",
      "jenisKerjasama": "Nota Kesepakatan",
      "pihak1": "MKP",
      "noPihak1": "04/MEN-KP/KB/V/2021",
      "pihak2": "Gubernur",
      "noPihak2": "9 Tahun 2021",
      "masaBerlaku": "5",
      "tanggalMulai": "5/27/2021",
      "tanggalSelesai": "5/27/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1DenRtkDFhIivLi1h4cqjO5v_NECe0MOe/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kemhan",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "KLHK",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/III/2021",
      "pihak2": "Menteri LHK",
      "noPihak2": "PKS.1/MENLHK/SETJEN/KSA.2/3/2021",
      "masaBerlaku": "",
      "tanggalMulai": "3/29/2021",
      "tanggalSelesai": "",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1mbkAXKj5gKofYz0AJhD3TRj1VQKh7urt/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "KPPPA",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/I/2021",
      "pihak2": "Menteri PPPA",
      "noPihak2": "02/Men/KL.01/01/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "1/29/2021",
      "tanggalSelesai": "1/29/2026",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1jN7GxsNT6Txg6yoakjQSEYvb-LbcasZE/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "BPJS Ketenagakerjaan",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "06/SJ-KKP/KB/XII/2021",
      "pihak2": "Direktur Utama",
      "noPihak2": "MOU/20/122021",
      "masaBerlaku": "5",
      "tanggalMulai": "12/72020",
      "tanggalSelesai": "07/12/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1UsqEMlxCIdNVMmh2xgJSc1DEhBh4dIAk/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan WWF Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "05/SJ-KKP/KB/X/2021",
      "pihak2": "Ketua",
      "noPihak2": "542/WWF-ID/LGL-AMD1-01819/XFY21/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "10/26/2021",
      "tanggalSelesai": "10/18/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1iV9qseZj-s0MWss2Ku9NehzRhyf-Qk3b/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Ormas Asing",
      "mitra": "RARE",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "VP RARE",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "08/10/21",
      "tanggalSelesai": "08/10/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1hz8yzCzb7SeXBhexWfm1CjxRiJ2MnACE/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "K/L",
      "mitra": "Kemenkomarves",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "PT PELINDO I",
      "kategoriMitra": "II",
      "mitra": "III",
      "jenisKerjasama": "IV",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirut PT PELINDO I",
      "kategoriMitra": "II",
      "mitra": "III",
      "jenisKerjasama": "IV",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2021",
      "kategoriMitra": "BUMN",
      "mitra": "PLN",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ-KKP/KB/IV/2021",
      "pihak2": "Dirut PLN",
      "noPihak2": "0026.MoU/HKM.02.02/C01000000/2021",
      "masaBerlaku": "3",
      "tanggalMulai": "4/13/2021",
      "tanggalSelesai": "4/13/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1toTwSEQLYHdnQoRFqlJc_h2PIx2Ev173/view?usp=share_link"
    },
    {
      "tahun": "2021",
      "kategoriMitra": "Ormas",
      "mitra": "YKAN",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ-KKP/KB/III/2021",
      "pihak2": "Ketua Yayasan",
      "noPihak2": "096/LTR/YKAN/JKT/ED/III/2021",
      "masaBerlaku": "5",
      "tanggalMulai": "10/03/21",
      "tanggalSelesai": "10/03/26",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1CBLuK75sRvWwbNDwLs37YVe3wNH_ffEk/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "KPK",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Irjen KKP",
      "noPihak1": "05/SJ-KKP/PKS/XII/2020",
      "pihak2": "Deputi Pengawasan Internal",
      "noPihak2": "372 tahun 2020",
      "masaBerlaku": "5",
      "tanggalMulai": "12/21/2020",
      "tanggalSelesai": "12/21/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1oWYNZ0XKVaMabDZ1PUbpdKUGoaHxLLRS/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Divisi Hubungan Internasional POLRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PSDKP",
      "noPihak1": "05/PKS-DJPSDKP//XII/2020",
      "pihak2": "Kadiv Hubungan Internasional POLRI",
      "noPihak2": "PKS/82/XII/2020",
      "masaBerlaku": "3",
      "tanggalMulai": "12/15/2020",
      "tanggalSelesai": "12/15/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1urKeunVapMoF3uW3ONnGylIHc-52RZ34/view?usp=drive_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Universitas",
      "mitra": "Fakultas Kelautan dan Perikanan UNSYIAH",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dekan",
      "noPihak1": "B/239/UN11/HK.07.00/2020",
      "pihak2": "Ka. Pangkalan PSDKP Lampulo",
      "noPihak2": "0909/LAN.1/HK.320/XI/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "11/25/2020",
      "tanggalSelesai": "11/25/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1MqwQxqIhfy7OtpP6mKZfa33Uya6t1bwR/view?usp=drive_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Universitas",
      "mitra": "Fakultas Biologi Unsoed",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dekan",
      "noPihak1": "T/499/UN.23.06/HK.06/2020",
      "pihak2": "Ka. Stasiun PSDKP Cilacap",
      "noPihak2": "2121/STA.1/HK.320/XI/2020",
      "masaBerlaku": "3",
      "tanggalMulai": "11/13/2020",
      "tanggalSelesai": "11/13/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1DEuAdnNORt8SFRIi4cSDrVAnsv7mlpg2/view?usp=drive_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "BUMN",
      "mitra": "BNI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kapusdatin",
      "noPihak1": "4351/SJ.7/HK.320/X/2020",
      "pihak2": "Kadiv Hubungan Kelembagaan",
      "noPihak2": "HLB/061/PKS/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "10/21/2020",
      "tanggalSelesai": "10/21/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Gl6nbsrm4wy61j1xKloHun2XSF97UyfA/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Swasta",
      "mitra": "PT Grab Teknologi Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Dirjen PDSPKP",
      "noPihak1": "03/PDSPKP/KKP/KB/VIII/2020",
      "pihak2": "Dirut PT Grab",
      "noPihak2": "013/GRAB-KKP/MOU-BD/VIII/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "8/19/2020",
      "tanggalSelesai": "8/19/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1zczjeRxH7m288CnspwRp3s4dIsxp_j6n/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Swasta",
      "mitra": "PT Tani Grup Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Dirjen PDSPKP",
      "noPihak1": "01/PDSPKP/KKP/KB/VIII/2020",
      "pihak2": "Presiden PT Tani Grup",
      "noPihak2": "007/LGL-TGI/MOU/VIII/2020",
      "masaBerlaku": "1",
      "tanggalMulai": "8/19/2020",
      "tanggalSelesai": "8/19/2021",
      "status": "Berhenti",
      "linkDokumen": "https://drive.google.com/file/d/1XZczQFfr0XDZSXaMm9OvDgUUXLQzX3cZ/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Swasta",
      "mitra": "PT Aruna Jaya Nuswantara",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PDSPKP",
      "noPihak1": "02/PDSPKP/KKP/PKS/VIII/2020",
      "pihak2": "Dirut",
      "noPihak2": "014/AJN/PKS/VIII/2020",
      "masaBerlaku": "3",
      "tanggalMulai": "8/19/2020",
      "tanggalSelesai": "8/19/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1xLBSkscQz14Tlx9QtolWGjmsrUiYpHpW/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Kemenko Polhukam",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "",
      "jenisKerjasama": "",
      "pihak1": "",
      "noPihak1": "",
      "pihak2": "",
      "noPihak2": "",
      "masaBerlaku": "",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Kemendes",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "04/MKP-KP/KB/X/2020",
      "pihak2": "Menteri Desa PDT",
      "noPihak2": "28/M/HK.07.01/X/2020",
      "masaBerlaku": "4",
      "tanggalMulai": "10/26/2020",
      "tanggalSelesai": "10/26/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1aDlcZly8mn2w4hoAw6zN6FKlw7nzkbJN/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "BUMN",
      "mitra": "PT Pelni",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "05/SJ-KKP/KB/XII/2020",
      "pihak2": "Dirut Pelni",
      "noPihak2": "TH.12.28-01/MOU/2020",
      "masaBerlaku": "3",
      "tanggalMulai": "12/28/2020",
      "tanggalSelesai": "12/28/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1xlPc8evlboW1OjJ8EXuA1je98Z5Cam_g/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Pusat Segitiga Karang (CTC)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ-KKP/KB/XII/2020",
      "pihak2": "Ketua Yayasan CTC",
      "noPihak2": "262/MOU/KKP-CTC/XII/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "12/21/2020",
      "tanggalSelesai": "12/21/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1T4f0PfPMyC59InouQ0557sHedFvEzSlI/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Bappenas",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "03/SJ-KKP/KB/XII/2020",
      "pihak2": "Sestama",
      "noPihak2": "NKB 18/SES/12/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "12/16/2020",
      "tanggalSelesai": "12/16/2025",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1y3BVHNZxkIPN3fqC7v83rcXFR1x6le4T/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Kementerian Keuangan",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ-KKP/PKS/XII/2020",
      "pihak2": "Dirjen Pajak",
      "noPihak2": "PRJ-20/PJ/2020",
      "masaBerlaku": "5",
      "tanggalMulai": "10/12/20",
      "tanggalSelesai": "10/12/25",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/16gzUexZxyjEcnMQtdW7qh-G7enq_AfyK/view?usp=share_link"
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Kemenkomarves",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2020",
      "kategoriMitra": "K/L",
      "mitra": "Kemenkomarves",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2020",
      "kategoriMitra": "BUMN",
      "mitra": "BNI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "03/SJ/KKP/PKS/II/2020",
      "pihak2": "Dir. Hubungan Kelembagaan",
      "noPihak2": "DIR/116.1",
      "masaBerlaku": "5",
      "tanggalMulai": "12/02/20",
      "tanggalSelesai": "12/02/25",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1-CKs57dL5FSK1hlj07Yex-LwM--6H4k-/view?usp=share_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Pusat Riset dan Pengembangan SDM, BSN",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kapus Standardisasi Sistem dan Kepatuhan, BKIPM",
      "noPihak1": "",
      "pihak2": "Kapus Riset dan Pengembangan SDM, BSN",
      "noPihak2": "",
      "masaBerlaku": "5",
      "tanggalMulai": "8/21/2019",
      "tanggalSelesai": "8/21/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1v8AtoziXmmF1WRvqBYTbL0E2d9HP1sRi/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen Kesehatan Masyarakat, Kemenkes",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen Kesehatan Masyarakat",
      "noPihak1": "HK.03.01/V/1801/2019",
      "pihak2": "Dirjen PDSPKP",
      "noPihak2": "11/PDSPKP-KKP/PKS/XII/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "12/14/2019",
      "tanggalSelesai": "12/14/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1coqP9fUgxH2nNyrw9EFG13k7kWrUVOIj/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Balai Besar Kalibrasi Fasilitas Penerbangan, DitJen HubUd, Kemenhub",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. POA, DitJen PSDKP",
      "noPihak1": "010/PKS-DJPSDKP/XII/2019",
      "pihak2": "Direktur Balai Besar",
      "noPihak2": "HK.201/3/5/BBKFP-2019",
      "masaBerlaku": "2",
      "tanggalMulai": "11/12/19",
      "tanggalSelesai": "10/12/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1k0oiY53QMRzH0xzmUaoMW4oddpsA_Qnh/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Swasta",
      "mitra": "Yayasan Pendidikan Pembinaan Manajemen",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. Jasa PengembanganEksekutif PPM Manajemen",
      "noPihak1": "",
      "pihak2": "Plt. Sesditjen PSDKP",
      "noPihak2": "32133/PSDKP.0.2.1/KS.300/X/2019",
      "masaBerlaku": "",
      "tanggalMulai": "10/31/2019",
      "tanggalSelesai": "12/12/19",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/122-oRSs0VTtXGvq6NllJbHWhrbwLQzpp/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BNN",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Ka. BNN",
      "noPihak1": "NK/115/X/KA/HK/2019/BNN",
      "pihak2": "MKP",
      "noPihak2": "06/MEN-KP/KB/X/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "10/18/2019",
      "tanggalSelesai": "10/18/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1LaXHYImTYUHOynssS1rNe6R4zHx_CP5K/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "BUMN",
      "mitra": "BRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Direktur BLU LPMUKP",
      "noPihak1": "01/PKS-LPMUKP/X/2019",
      "pihak2": "KaDiv. BRI",
      "noPihak2": "B.01-BKC/10/2019",
      "masaBerlaku": "",
      "tanggalMulai": "10/17/2019",
      "tanggalSelesai": "",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1wP2Fw2yRAZpNZi-XaSfK9NkSwrAQTgyF/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "BUMN",
      "mitra": "PT. Pertamina (Persero) Marketing Operation Region VIII",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "SesDitjen PRL",
      "noPihak1": "5/PRL/KKP/PKS/IX/2019",
      "pihak2": "General Manager Marketing Operation Region VIII",
      "noPihak2": "074/F18400/2019-S7",
      "masaBerlaku": "3",
      "tanggalMulai": "9/25/2019",
      "tanggalSelesai": "9/25/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1iJuh-EovQyCVVQEAl3CEfLEo64wANsVU/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Bid Pencegahan, Perlindungan, dan Deradikalisasi, BNPT",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Deputi Bid Pencegahan, Perlindungan, dan Deradikalisasi, BNPT",
      "noPihak1": "HK.02.00/10/2019",
      "pihak2": "Sekjen KKP",
      "noPihak2": "08/PKS-DJPSDKP/IX/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "10/09/19",
      "tanggalSelesai": "10/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1g8GiIk-gprUDMGqnckFjmaRpgUUCfcgD/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BNPT",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Ka. BNPT",
      "noPihak1": "HK.02.00/9/2019",
      "pihak2": "MKP",
      "noPihak2": "04/MEN-KP/KB/IX/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "10/09/19",
      "tanggalSelesai": "10/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1wQMLI6sxC3LK65zbhrmng6XvbeVO36hG/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "POLRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. PSDK, DitJen PSDKP",
      "noPihak1": "07/PKS-DJPSDKP/IX/2019",
      "pihak2": "Ka. LEMDIKLAT POLRI",
      "noPihak2": "B/106/IX/2019",
      "masaBerlaku": "",
      "tanggalMulai": "03/09/19",
      "tanggalSelesai": "",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1m1i2QPQVF3sCLh4Bf5CqfPnmxepdaYfX/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BPPT",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir KAPI",
      "noPihak1": "14/PT/KKP/PKS/VIII/2019",
      "pihak2": "Dir.PusTek Rekayasa Industri Maritim",
      "noPihak2": "/PKS/BPPT-KKP/08/2019",
      "masaBerlaku": "-",
      "tanggalMulai": "8/27/2019",
      "tanggalSelesai": "12/31/2019",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/133iNajsjj71vsGNVP_AyqQpgacvZzoWF/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "POLRI",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Kapolri",
      "noPihak1": "B/90/VII/2019",
      "pihak2": "MKP",
      "noPihak2": "03/MEN-KP/KB/VII/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "7/30/2019",
      "tanggalSelesai": "7/30/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1HhamCeNqsFlAyk_LX3V5_C1ehORG3Enq/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen Bea Cukai",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Pusdik Intelkam Lemdiklat POLRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka.Puskari",
      "noPihak1": "471/BKIPM.2/TU.210/IV/2019",
      "pihak2": "Ka.Pusdik Intelkamlendiklat",
      "noPihak2": "B/197/IV/HUM.5.1/2019/DIKINTELKAM",
      "masaBerlaku": "-",
      "tanggalMulai": "09/04/19",
      "tanggalSelesai": "",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Brgyuapz9DbUIg51othDucFjROgViuAv/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Kemenkomar",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Diponegoro",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "12/PT/KKP/PKS/III/2019",
      "pihak2": "Dekan FPIK Undip",
      "noPihak2": "003/UN7.5.10/KS/III/2019",
      "masaBerlaku": "3",
      "tanggalMulai": "3/21/2019",
      "tanggalSelesai": "3/21/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1ggv7ayCz48n58E5rg1ER23uaQ1RRt-st/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen HubLa, Kemenhub",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT, KKP",
      "noPihak1": "01/PT/KKP/PKS/III/2019",
      "pihak2": "Dirjen HubLa, Kemenhub",
      "noPihak2": "HK.201/2/17/DJPL/2019",
      "masaBerlaku": "2",
      "tanggalMulai": "05/03/19",
      "tanggalSelesai": "05/03/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Au2lYA_1GNJiN-yr4cxWfg3YMVybnnqz/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "BUMN",
      "mitra": "Angkasa Pura I",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Ka. BKIPMKHP",
      "noPihak1": "866/BKIPM/II/2019",
      "pihak2": "Direktur Utama",
      "noPihak2": "SP.32/HK.09.01/2019/DU",
      "masaBerlaku": "5",
      "tanggalMulai": "2/14/2019",
      "tanggalSelesai": "2/14/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/10JsXop2Ib3HDy1loZ3C_oeco6bBZZIa0/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Swasta",
      "mitra": "PT. ASTRA Daihatsu Motor",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "SesDitjen PRL",
      "noPihak1": "04/PRL/KKP/PKS/II/2019",
      "pihak2": "Direktur Marketing",
      "noPihak2": "001/CSR-ADM/PKS/-2/19",
      "masaBerlaku": "3",
      "tanggalMulai": "2/13/2019",
      "tanggalSelesai": "2/13/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1KaYmS3TSqlQW8bxEHsruYvavY3_HBmup/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Pemda",
      "mitra": "Dinas KP Jabar",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "KaDin KP Jabar",
      "noPihak1": "065/lan.3/HK.320/IV/2019",
      "pihak2": "Ka. PSDKP Jakarta",
      "noPihak2": "119/3572/PSDKP",
      "masaBerlaku": "1",
      "tanggalMulai": "04/02/19",
      "tanggalSelesai": "12/31/2019",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1_8xqFXTeHoDCJ8uI-rSklLtYhnKO_Jsq/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Penyu Indonesia",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. BPSPL Padang",
      "noPihak1": "02/BPSPL.01/PRL/KKP/PKS/I/2019",
      "pihak2": "Ketua YPI",
      "noPihak2": "01/YPI/PKS/I/2019",
      "masaBerlaku": "3",
      "tanggalMulai": "1/16/2019",
      "tanggalSelesai": "1/16/2022",
      "status": "Proses Peninjauan",
      "linkDokumen": "https://drive.google.com/file/d/1GECp280aJJdkSjQe6lJqWPi0sWn0Upn7/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BNPT",
      "jenisKerjasama": "",
      "pihak1": "",
      "noPihak1": "",
      "pihak2": "",
      "noPihak2": "",
      "masaBerlaku": "",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "Kemenhub",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "08/MEN-KP/KB/XII/2019",
      "pihak2": "MenHub",
      "noPihak2": "PJ.105 TAHUN 2019",
      "masaBerlaku": "5",
      "tanggalMulai": "04/12/19",
      "tanggalSelesai": "04/12/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1LU1BdrodGlj03qHB9zX7uR9c-q_in0ZG/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BAKAMLA",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/X/2019",
      "pihak2": "Ka.BAKAMLA",
      "noPihak2": "SP - 029/BAKAMLA/X/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "10/18/2019",
      "tanggalSelesai": "10/18/2024",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1K-EX6R5ot3cPszGCCj0FiOijqyz0tgob/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas",
      "mitra": "HKBP",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "05.2/MEN-KP/KB/IX/2019",
      "pihak2": "Ephorus HKBP",
      "noPihak2": "1379/L19/IX/2019",
      "masaBerlaku": "",
      "tanggalMulai": "9/15/2019",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": "https://drive.google.com/file/d/1bwc9nRCX80-_Y83PyJsM_MJ40vGma0Ej/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BNP2TKI",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "05.1/MEN-KP/KB/IX/2019",
      "pihak2": "Ka.BNP2TKI",
      "noPihak2": "B.12/Ka-MoU/IX/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "10/09/19",
      "tanggalSelesai": "10/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1sDpEWO8BMnmOWGK44LTknkVLhQDERdY_/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "LIPI",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/IX/2019",
      "pihak2": "Ka. LIPI",
      "noPihak2": "61/KS/LIPI/IX/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "09/09/19",
      "tanggalSelesai": "09/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1GbguVhlSkbGqibI7P6OYmQlL2Mmsbd9l/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BNPB",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "02/MEN-KP/KB/III/2019",
      "pihak2": "Ka.BNPB",
      "noPihak2": "17/BNPB/III/2019",
      "masaBerlaku": "5",
      "tanggalMulai": "08/03/19",
      "tanggalSelesai": "08/03/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1nwzgpeJoqUcZM42G9thqpwjZy2MAK9_d/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "TNI",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/II/2019",
      "pihak2": "Panglima TNI",
      "noPihak2": "NK/1/II/2019/TNI",
      "masaBerlaku": "5",
      "tanggalMulai": "11/02/19",
      "tanggalSelesai": "11/02/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1XV53pH93iaS7Qkf0T_FnVywTGJYVX-lX/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "K/L",
      "mitra": "BPJS Ketenagakerjaan",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "04/SJ-KKP/KB/XII/2019",
      "pihak2": "Dirut BPJS Ketenagakerjaan",
      "noPihak2": "MoU/21/122019",
      "masaBerlaku": "3",
      "tanggalMulai": "04/12/19",
      "tanggalSelesai": "04/12/22",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1G95ki7azFu3kYeYVFU4r9sgDOvhuSPth/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas",
      "mitra": "WWF Indonesia",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "03/SJ-KKP/KB/X/2019",
      "pihak2": "CEO WWF Indonesia",
      "noPihak2": "018/WWF-ID/LGL-MOU-20014/X/FY20/2019",
      "masaBerlaku": "3",
      "tanggalMulai": "10/18/2019",
      "tanggalSelesai": "10/18/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1HwIXsHhBrRTJ_JkSbYknq41YHpMh03GC/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "BUMN",
      "mitra": "BRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ/KKP/PKS/X/2019",
      "pihak2": "Dir. Bisnis Mikro",
      "noPihak2": "B.1475-DIR/IMR/10/2019",
      "masaBerlaku": "",
      "tanggalMulai": "10/10/19",
      "tanggalSelesai": "",
      "status": "Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Th52zIDxFWpdeZG5oNSgDsETa4Z3LPxZ/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas Asing",
      "mitra": "SFPF",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "Direktur Program",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "9/17/2019",
      "tanggalSelesai": "9/17/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1yiOsHATqph9TH5UMRMe-GhebxOMTREi3/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "BUMN",
      "mitra": "Biro Klasifikasi Indonesia (PERSERO)",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ-KKP/KB/IX/2019",
      "pihak2": "Direktur Utama",
      "noPihak2": "B.8471/HK.503/KI-19",
      "masaBerlaku": "5",
      "tanggalMulai": "09/09/19",
      "tanggalSelesai": "09/09/24",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1HS2NbKxdbG8Ga0bQi-FKnLmvM_Bur9tZ/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas Asing",
      "mitra": "MSC",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "Regional Director Asia Pacific",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "8/27/2019",
      "tanggalSelesai": "8/27/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1j-EENT-gVEBf6IKh1d934HNegSoouwe5/view?usp=drive_link"
    },
    {
      "tahun": "2019",
      "kategoriMitra": "Ormas Asing",
      "mitra": "EDF",
      "jenisKerjasama": "Memorandum Saling Pengertian",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "VP Asia Pasific EDF",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "09/04/19",
      "tanggalSelesai": "09/04/22",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1WVmvwvcw9frC6quS3fxQ0UP60HkwbSEa/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Pemda",
      "mitra": "Kabupaten Karangasem",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Bupati Karangasem",
      "noPihak1": "075/311/KB/AD.PEM/2018",
      "pihak2": "Dirjen PB",
      "noPihak2": "11/DJPB-KKP/KB/VI/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "6/22/2018",
      "tanggalSelesai": "6/22/2023",
      "status": "Proses Peninjauan",
      "linkDokumen": "https://drive.google.com/file/d/1G96b-GHvTiWM-1zAtORhzI2jCKgs2DTy/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "BUMN",
      "mitra": "PT. Garam",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir Jasa Kelautan",
      "noPihak1": "02/PRL/KKP/PKS/V/2018",
      "pihak2": "Dir. Operasi",
      "noPihak2": "20/KS/V/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "5/23/2018",
      "tanggalSelesai": "5/23/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1VbEzFPcKcVnZ7-uRJUKJOtWKm6cykdfw/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Singaperbangsa Karawang",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. Poltek KP Karawang",
      "noPihak1": "259.1/POLTEK.KRW/KS.310/III/2018",
      "pihak2": "Rektor Universitas Singaperbangsa Karawang",
      "noPihak2": "494/UN64/KS/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "5/23/2018",
      "tanggalSelesai": "5/23/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1wDceVrjM9GCJbiTJKXv21UtTPk0mxiRE/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Ditjen Dukcapil, Kemendagri",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen Dukcapil, Kemendagri",
      "noPihak1": "119/18561/DUKCAPIL",
      "pihak2": "Sekjen KKP",
      "noPihak2": "04/SJ/KKP/PKS/X/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "08/10/18",
      "tanggalSelesai": "08/10/23",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1XAyKIHSG1KJl-DDKu7SuMzmXD-kMPVIu/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Dirjen Hubungan Hukum Keagrariaan, Kementerian Agraria dan Tata Ruang",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen Bina Pembangunan Daerah",
      "kategoriMitra": "Kemendagri",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Deputi Bidang Pembiayaan",
      "kategoriMitra": "KemKop UKM",
      "mitra": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen Prasarana dan Sarana Pertanian",
      "kategoriMitra": "Kementan Dirjen PT",
      "mitra": "KKP",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen PB",
      "kategoriMitra": "KKP,Perjanjian Kerja Sama,Dirjen Hub Hukum Keagrariaan",
      "mitra": "Kementerian Agraria dan Tata Ruang,29/SKB-400/IV/2018,Dirjen Hubungan Hukum Keagrariaan",
      "jenisKerjasama": "Kementerian Agraria dan Tata Ruang",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen Bina Pembangunan Daerah",
      "kategoriMitra": "Kemendagri",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Deputi Bidang Pembiayaan",
      "kategoriMitra": "KemKop UKM",
      "mitra": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen Prasarana dan Sarana Pertanian",
      "kategoriMitra": "Kementan Dirjen PT",
      "mitra": "KKP",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "Dirjen PB",
      "kategoriMitra": "KKP,500/1738/Banda/2018 01/PKS/Dep.2/IV/2018 03/MoU/OT.160/B/04/2018 01/PKS/DJPT-KKP/IV/2018 01/DJPB-KKP/PKS/IV/2018,5,05/04/18,05/04/23,Tidak Berlaku,https://drive.google.com/file/d/1frADh0fpFOVC1TzolEnD0CtoWDLoCyXs/view?usp=drive_link,,,,",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Lembaga Biologi Molekuler EIJKMAN, RISTEKDIKTI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PRL",
      "noPihak1": "5/PRL/KKP/PKS/IX/2018",
      "pihak2": "Kepala Lembaga Biologi Molekuler EIJKMAN",
      "noPihak2": "07.1/Eijk/MoU-18/IX/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "03/09/18",
      "tanggalSelesai": "03/09/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1YTXEWlo1nJIgEuz4BdqHs2ULp3-xyHFI/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Ormas",
      "mitra": "Perhimpunan Pelestarian Burung Liar Indonesia",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PRL",
      "noPihak1": "03/PRL/KKP/PKS/VII/2018",
      "pihak2": "Ketua Dewan Perhimpunan",
      "noPihak2": "002/PKS-BOGOR/VII/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "11/07/18",
      "tanggalSelesai": "11/07/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1bvTPSwTDEUSDbfrp6VyROUZmquBWR7co/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Badan Ketahanan Pangan",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Swasta",
      "mitra": "PT. Martina Berto",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. BBRPPBKP",
      "noPihak1": "180/BRSDM/KKP/PKS/X/2018",
      "pihak2": "Kuasa Direksi",
      "noPihak2": "49/LGL/MB-BRSDM/X/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "09/10/18",
      "tanggalSelesai": "09/10/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1xOwrYXEVIqnYOYmu3gEbZRQy4WIO3E8i/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "BNN Kabupaten Karawang",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. BNN Kab Karawang",
      "noPihak1": "PKS/05/V/2018/BNNK KRW",
      "pihak2": "Dir. Poltek KP Karawang",
      "noPihak2": "520/POLTEK.KRW/KS.320/V/2018",
      "masaBerlaku": "1",
      "tanggalMulai": "5/23/2018",
      "tanggalSelesai": "5/23/2019",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1qXXcO56QutWa03tF2Ydhda0s21YxAxS9/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Halu Oleo",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. BRSDMKP",
      "noPihak1": "98/BRSDMKP/KKP/PKS/IX/2018",
      "pihak2": "Rektor Universitas Halu Oleo",
      "noPihak2": "2156/UN29/LL/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "9/15/2018",
      "tanggalSelesai": "9/15/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1YSIZnmXqAeovpdlWZAGN_2EJIVo32v1y/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "BUMN",
      "mitra": "BNI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. Pusdatin",
      "noPihak1": "03/SJ/KKP/PKS/IV/2018",
      "pihak2": "Pimpinan Divisi Hubungan Kelembagaan",
      "noPihak2": "HLB/021/PKS/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "05/04/18",
      "tanggalSelesai": "05/04/23",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1W_uh_RYBXWK8_OXbxDftoXHxSWkXX7ET/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Pusat Alikasi Isotop dan Radiasi, BATAN",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. PusRiKel",
      "noPihak1": "16/BRSDM/KKP/PKS/VIII/2018",
      "pihak2": "Ka. Pus Alikasi Isotop dan Radiasi",
      "noPihak2": "B-2396/BATAN/AIR/KS 00 01/08/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "8/16/2018",
      "tanggalSelesai": "8/16/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1RDTKmVtj7t9CgpTymf-ukc0rfJx9WszZ/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Swasta",
      "mitra": "LPK Wakashio Gakkou",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. SUPM Tegal",
      "noPihak1": "0722/BRSDM-SUPM TGL/KS.310/V/2018",
      "pihak2": "General Manager",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "09/05/18",
      "tanggalSelesai": "09/05/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/15XYVQ4qol1wYVTyDN-KxTpctvCc4jks2/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "TNI AL",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kadis Perawatan Personel AL",
      "noPihak1": "PKS/5/II/2018",
      "pihak2": "Ses. BRSDMKP",
      "noPihak2": "01/BRSDM/KKP/PKS/2018",
      "masaBerlaku": "2",
      "tanggalMulai": "2/21/2018",
      "tanggalSelesai": "2/21/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1e5NNeXMYwZs6QGGOyGd7WPYv8s3mTmlI/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "FPIK UNIBRAW",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Kapusdik KP",
      "noPihak1": "160/BRSDM.4/KS.300/V/2018",
      "pihak2": "Dekan FPIK Unibraw",
      "noPihak2": "2416/UN10.F06/KS/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "02/05/18",
      "tanggalSelesai": "02/05/23",
      "status": "Proses Peninjauan",
      "linkDokumen": "https://drive.google.com/file/d/1shsM6VoiO6FN6-4oYVKOpvRJQXn9dArN/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Mulawarman",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Kepala BRSDMKP",
      "noPihak1": "64/BRSDM/KKP/KB/IX/2018",
      "pihak2": "Rektor Universitas Mulawarman",
      "noPihak2": "2111/UN17/KS/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "9/19/2018",
      "tanggalSelesai": "9/19/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1jjR3IpqcX4wpY8pkLQTVwmyQ-Rp0W4Bx/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "BPOM",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PDSPKP",
      "noPihak1": "04/PDSPKP/KKP/PKS/VII/2018",
      "pihak2": "Deputi Bid. Pengawasan Pangan Olahan",
      "noPihak2": "HK.09.01.5.23.07.82.2844",
      "masaBerlaku": "5",
      "tanggalMulai": "7/30/2018",
      "tanggalSelesai": "7/30/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1iSMciGmH8ntSUhyaeL5-ELGP0VC2Ldwd/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "SKK Migas",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/X/2018",
      "pihak2": "Ka. SKK Migas",
      "noPihak2": "MOU - 0003/SKKMA0000/2018/SO",
      "masaBerlaku": "5",
      "tanggalMulai": "10/18/2018",
      "tanggalSelesai": "10/18/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/18fxyd_EbULlTPv3SlJQK4P8LmdixcQfF/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Brawijaya",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/VIII/2018",
      "pihak2": "Rektor UNIBRAW",
      "noPihak2": "085/UN10/KS/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "8/14/2018",
      "tanggalSelesai": "8/14/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1aNypabo7sICCVPnKaEMSBJivuMPQYca_/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Diponegoro",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "06/MEN-KP/KB/VIII/2018",
      "pihak2": "Rektor UNDIP",
      "noPihak2": "4902/UN7.P/KS/2018",
      "masaBerlaku": "5",
      "tanggalMulai": "12/08/18",
      "tanggalSelesai": "12/08/23",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/10HXxjaQVumZ295Gg2wFrO7siR84p1Pg6/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Ormas",
      "mitra": "Asosiasi Perikanan Pole & Line dan Handline Indonesia (AP2HI)",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "02/PT/KKP/PKS/VI/2018",
      "pihak2": "Sekjen AP2HI",
      "noPihak2": "001/PKS/AP2HI-DJPT/VI/2018",
      "masaBerlaku": "2",
      "tanggalMulai": "01/06/18",
      "tanggalSelesai": "01/06/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/18bxaxYLKGvac8LFVyL42Dle64qHnSTcc/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Kemendagri",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/VII/2018",
      "pihak2": "Mendagri",
      "noPihak2": "523/5141/SJ",
      "masaBerlaku": "5",
      "tanggalMulai": "7/24/2018",
      "tanggalSelesai": "7/24/2023",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1r5ePGxu391qLt8MZGJjCtCZZCNI-x-3f/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "BMKG",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "04/MEN-KP/KB/IV/2018",
      "pihak2": "Ka. BMKG",
      "noPihak2": "KS.301/MoU.10/KB/IV/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "4/23/2018",
      "tanggalSelesai": "4/23/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1kU6OF0WWtFPWDfzYFZBR1kiDoefV8sO_/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Ormas",
      "mitra": "KemenTan",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/I/2018",
      "pihak2": "MenTan",
      "noPihak2": "02/Mou.HK.220/1/2018",
      "masaBerlaku": "2",
      "tanggalMulai": "11/01/18",
      "tanggalSelesai": "11/01/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1TBVnBVhuClmRgJ-kYElIKeoyto6oSE3S/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Dit. Statistik Harga, BPS",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "SesDitjen PRL",
      "noPihak1": "1/PRL/KKP/PJ/II/2018",
      "pihak2": "Dir. Statistik Harga, BPS",
      "noPihak2": "04A.08.15/KS.P/15-II/2018",
      "masaBerlaku": "",
      "tanggalMulai": "2/15/2018",
      "tanggalSelesai": "12/31/2018",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1Dwg1ftHUutinLbWF9Y4NXhxEuZE_KGLD/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "BUMN",
      "mitra": "Bank Mandiri",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PB",
      "noPihak1": "1/PB/KKP/PKS/I/2018",
      "pihak2": "Direktur Kelembagaan",
      "noPihak2": "DIR.PKS/002/2018",
      "masaBerlaku": "",
      "tanggalMulai": "11/01/18",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": "https://drive.google.com/file/d/1Q57OCBW5yIMZXjVlOi2cLF2rCoL9Dx7Z/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "Ormas",
      "mitra": "MDPI",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ-KKP/KB/2018",
      "pihak2": "Direktur Eksekutif MDPI",
      "noPihak2": "004/MDPI-KB/XII/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "07/12/18",
      "tanggalSelesai": "07/12/22",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1bVbgunScSyGNlRUEBOURJ4FT0Wff0_qE/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "Pupuk Indonesia (Persero)",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ-KKP/KB/V/2018",
      "pihak2": "Direktur Utama",
      "noPihak2": "033.1/SP/DIR-D20/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "5/18/2018",
      "tanggalSelesai": "5/18/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1dUDcMQNhIzq3uBwYJhCF6VVBsqZbxWVj/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "BUMN",
      "mitra": "Garuda Indonesia",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "KKP 03/MEN-KP/KB/IV/2018",
      "pihak2": "Direktur Utama",
      "noPihak2": "IG/PERJ/MOU/DZ-3092/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "05/04/18",
      "tanggalSelesai": "05/04/21",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/13EHVEcW1dORnmI1SKBb1V0WB3qVrn9w0/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "K/L",
      "mitra": "KemKominfo",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "02/SJ/KKP/I/2018",
      "pihak2": "Sekjen KemKominfo",
      "noPihak2": "01/SJ/KOMINFO/HK.03.02/01/2018",
      "masaBerlaku": "3",
      "tanggalMulai": "1/18/2018",
      "tanggalSelesai": "1/18/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1sUzb6pTnDj5BbtbpDFGIjTInhvcWgFIV/view?usp=drive_link"
    },
    {
      "tahun": "2018",
      "kategoriMitra": "BUMN",
      "mitra": "PT. PERTAMINA GAS",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "01/SJ/KKP/PKS/I/2018",
      "pihak2": "Presiden Direktur",
      "noPihak2": "004/PG0000/2018-SO",
      "masaBerlaku": "3",
      "tanggalMulai": "1/17/2018",
      "tanggalSelesai": "1/17/2021",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1kBAAJce7Mgs7Q2it6JzPkSl-OxD6SdEk/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "BPPT",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. KAPI",
      "noPihak1": "01/PKS/DJPT-KKP/4/2017",
      "pihak2": "Dir. Pustek Rekayasa Industri Maritim",
      "noPihak2": "22/PKS/BPPT-KKP/04/2017",
      "masaBerlaku": "",
      "tanggalMulai": "4/18/2017",
      "tanggalSelesai": "12/31/2017",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1RZuSivXSbxBqj1TJZnOLZsVOb2g5fbJ9/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "BUMN",
      "mitra": "BRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. LPMUKP",
      "noPihak1": "05/PKS-LPMUKP/VIII/2017",
      "pihak2": "Dir. BRI",
      "noPihak2": "B.973-DIR/INS/08/2017",
      "masaBerlaku": "5",
      "tanggalMulai": "8/25/2017",
      "tanggalSelesai": "8/25/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1WoCJe4-cquw7M9v6Hks6mFkMIrlD4xhP/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "BUMN",
      "mitra": "PT. PERTAMINA",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dir. SDM, TI, dan Umum",
      "noPihak1": "SP-008/K00000/2017-S0",
      "pihak2": "Sekjen KKP",
      "noPihak2": "01/SJ/KKP/PKS/VI/2017",
      "masaBerlaku": "5",
      "tanggalMulai": "6/21/2017",
      "tanggalSelesai": "6/21/2022",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1io-7-4NMO1QNGUi7rfbgW5UllyOaPmwN/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "BUMN",
      "mitra": "PT POS Indonesia",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "DirJen PRL",
      "noPihak1": "3/PRL/KKP/PKS/X/2017",
      "pihak2": "Dirut PT Pos Indonesia",
      "noPihak2": "PKS.259/DIRUT/1017",
      "masaBerlaku": "3",
      "tanggalMulai": "10/31/2017",
      "tanggalSelesai": "10/31/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/drive/folders/1StF072uFgAhfGrQT-Bzt-qgpchSRc-1c?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "Balitbang Kemdikbud",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PRL",
      "noPihak1": "I/PRL/KKP/PKS/III/2017",
      "pihak2": "Ka. Balitbang Kemdikbud",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "3/13/2017",
      "tanggalSelesai": "3/13/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1mHf_Z4nhfWHhvZek3_QLA5x2HVrlKAoE/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "Deputi Bidang Pengembangan Kelembagaan Kepariwisataan",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Ka. BPSDMKP",
      "noPihak1": "17/BPSDMKP/KKP/PKS/II/2017",
      "pihak2": "Ka. Deputi Bidang Pengembangan Kelembagaan Kepariwisataan",
      "noPihak2": "PK.70/KS.001/DPKP/KEMPAR/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "07/02/17",
      "tanggalSelesai": "07/02/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1_kD9f72I8GcYV8ChH1w401y1WJt1Xhf9/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "LKPP",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Ka. LKPP",
      "noPihak1": "9 Tahun 2017",
      "pihak2": "MKP",
      "noPihak2": "15/MEN-KP/KB/XII/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "12/13/2017",
      "tanggalSelesai": "12/13/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1BmQHRbB8i_GbaJde0L0jAYaIvJyVY5Ge/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "KPPPA",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "07/MEN-KP/KB/VI/2017",
      "pihak2": "MenPPPA",
      "noPihak2": "21/KPP-PA/D.I/06/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "6/16/2017",
      "tanggalSelesai": "6/16/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1S0h1CWFPCtCiwYfP_SI0p1QBAfc17tYx/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "Kemdikbud",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "MKP",
      "noPihak1": "04/MEN-KP/KB/II/2017",
      "pihak2": "Mendikbud",
      "noPihak2": "10/II/NK/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "2/25/2017",
      "tanggalSelesai": "2/25/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1TkPnwjQ-A_cm6t0EgQI7i91YondycngJ/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "Kemenpar",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "03/MEN-KP/KB/II/2017",
      "pihak2": "Menpar",
      "noPihak2": "KB.2/KS.001/MP/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "07/02/17",
      "tanggalSelesai": "07/02/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1oiaTxQGMAsu5HXKmWqebxKnKsmzKSfza/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "Ormas",
      "mitra": "Yayasan Dana Sejahtera Mandiri Universitas Trilogi",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "01/MEN-KP/KB/II/2017",
      "pihak2": "Ketua Yayasan dan Rektor",
      "noPihak2": "006/MoU//YDSM/I/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "02/02/17",
      "tanggalSelesai": "02/02/20",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1YXV0hRDjZERE112QYvogosCS1D69cC77/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "Universitas",
      "mitra": "Universitas Muhaammadiyah Malang",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "MKP",
      "noPihak1": "05/MEN-KP/KB/II/2017",
      "pihak2": "Rektor UMM",
      "noPihak2": "E.5.c/366/UMM/11/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "2/25/2017",
      "tanggalSelesai": "2/25/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1c2q2vw6sOXmNnvUvmuNJoWHzaVYDy7Dt/view?usp=share_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "Ormas",
      "mitra": "Himpunan Nelayan Seluruh Indonesia",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "04/PKS/DJPT-KKP/XI/2017",
      "pihak2": "Ketua Umum",
      "noPihak2": "011/DPP HNSI/PKS/XI/2017",
      "masaBerlaku": "5",
      "tanggalMulai": "10/11/17",
      "tanggalSelesai": "10/11/22",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1WssyAf_n1CETl0HJN2-OwAILqC8okMLU/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "BUMN",
      "mitra": "BRI",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PT",
      "noPihak1": "03/PKS/DJPT-KKP/VIII/2017",
      "pihak2": "Dir. BRI",
      "noPihak2": "B.974-DIR/PPK/08/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "8/25/2017",
      "tanggalSelesai": "8/25/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1OLCNORc7MCsQP-EPCDh3YbmgbdASzW73/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "LAPAN",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PSDKP",
      "noPihak1": "01/PKS-DJPSDKP/2017",
      "pihak2": "Deputi Bidang Teknologi Penerbangan dan Antariksa",
      "noPihak2": "04/15/17",
      "masaBerlaku": "3",
      "tanggalMulai": "4/18/2017",
      "tanggalSelesai": "4/18/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1rWeo7UxSoYA89wKDKFH6M3gMSBVTmnwQ/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "BPPT",
      "jenisKerjasama": "Perjanjian Kerja Sama",
      "pihak1": "Dirjen PB",
      "noPihak1": "04/PB/KKP/IV/2017",
      "pihak2": "Deputi Bidang Teknologi Agroindustri dan Bioteknologi,",
      "noPihak2": "23/PKS/BPPT-KKP/04/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "4/18/2017",
      "tanggalSelesai": "4/18/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/17qSm_N12_T53SMH-wzwVQnqoEa_V1vxZ/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "BUMN",
      "mitra": "PLN",
      "jenisKerjasama": "Kesepakatan Bersama",
      "pihak1": "Sekjen KKP",
      "noPihak1": "",
      "pihak2": "Dirut PLN",
      "noPihak2": "",
      "masaBerlaku": "3",
      "tanggalMulai": "6/16/2017",
      "tanggalSelesai": "6/16/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1fGrRnlPbl_Qh_NrpDfWEOyQt4t9OaQBM/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "BPPT",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "06/MEN-KP/KB/IV/2017",
      "pihak2": "Ka. BPPT",
      "noPihak2": "18/NK/BPPT-KKP/04/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "4/18/2017",
      "tanggalSelesai": "4/18/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/15HhIRKS7FMty_W-pYZpEMsWgZxrGBvQ3/view?usp=drive_link"
    },
    {
      "tahun": "2017",
      "kategoriMitra": "K/L",
      "mitra": "BPPT",
      "jenisKerjasama": "Nota Kesepahaman",
      "pihak1": "Sekjen KKP",
      "noPihak1": "06/MEN-KP/KB/IV/2017",
      "pihak2": "Ka. BPPT",
      "noPihak2": "18/NK/BPPT-KKP/04/2017",
      "masaBerlaku": "3",
      "tanggalMulai": "4/18/2017",
      "tanggalSelesai": "4/18/2020",
      "status": "Tidak Berlaku",
      "linkDokumen": "https://drive.google.com/file/d/1qwJGVEfMMLsNFOHFIwlA0nfZwd5gMX_M/view?usp=drive_link"
    },
    {
      "tahun": "",
      "kategoriMitra": "DAFTAR KERJA SAMA KEMENTERIAN KELAUTAN DAN PERIKANAN",
      "mitra": "",
      "jenisKerjasama": "",
      "pihak1": "",
      "noPihak1": "",
      "pihak2": "",
      "noPihak2": "",
      "masaBerlaku": "",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "",
      "kategoriMitra": "Periode 2020-2024",
      "mitra": "",
      "jenisKerjasama": "",
      "pihak1": "",
      "noPihak1": "",
      "pihak2": "",
      "noPihak2": "",
      "masaBerlaku": "",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    },
    {
      "tahun": "",
      "kategoriMitra": "Universitas",
      "mitra": "",
      "jenisKerjasama": "",
      "pihak1": "",
      "noPihak1": "",
      "pihak2": "",
      "noPihak2": "",
      "masaBerlaku": "",
      "tanggalMulai": "",
      "tanggalSelesai": "",
      "status": "-",
      "linkDokumen": ""
    }
  ],

  formatDateForInput(dateStr) {
    if (!dateStr || dateStr === '-') return '';
    try {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        let m = parts[0].padStart(2, '0');
        let d = parts[1].padStart(2, '0');
        let y = parts[2];
        if (y.length === 2) y = '20' + y;
        return `${y}-${m}-${d}`;
      }
    } catch (e) { }
    return dateStr;
  },

  formatDateForSave(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      }
    } catch (e) { }
    return dateStr;
  },

  openForm(index = -1) {
    const isEdit = index !== -1;
    let r = {};
    if (isEdit) {
      r = this.data[index];
    }

    const modalHtml = `
      <div id="kpModal" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div class="card" style="width:100%;max-width:800px;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;">
          <div style="padding:20px;border-bottom:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#fff;z-index:10;">
            <h3 style="margin:0;font-size:18px;font-weight:600">${isEdit ? '✏️ Edit Kerja Sama' : '✨ Tambah Kerja Sama'}</h3>
            <button class="btn btn-ghost btn-sm" onclick="KebijakanPrioritasPage.closeForm()">✕ Tutup</button>
          </div>
          
          <form id="kpForm" novalidate onsubmit="event.preventDefault(); KebijakanPrioritasPage.saveForm(${index});" style="padding:24px;display:flex;flex-direction:column;">
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Kategori Mitra <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="inpKategori" required>
                  <option value="">Pilih Kategori...</option>
                  <option value="Pemda" ${r.kategoriMitra === 'Pemda' ? 'selected' : ''}>Pemda</option>
                  <option value="K/L" ${r.kategoriMitra === 'K/L' ? 'selected' : ''}>K/L</option>
                  <option value="BUMN" ${r.kategoriMitra === 'BUMN' ? 'selected' : ''}>BUMN</option>
                  <option value="Universitas" ${r.kategoriMitra === 'Universitas' ? 'selected' : ''}>Universitas</option>
                  <option value="Ormas" ${r.kategoriMitra === 'Ormas' ? 'selected' : ''}>Ormas</option>
                  <option value="Swasta" ${r.kategoriMitra === 'Swasta' ? 'selected' : ''}>Swasta</option>
                  <option value="Lainnya" ${r.kategoriMitra === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Nama Mitra <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="inpMitra" value="${r.mitra || ''}" placeholder="Contoh: PT Telkom" required>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Jenis Kerja Sama <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="inpJenis" required>
                  <option value="Perjanjian Kerja Sama" ${r.jenisKerjasama === 'Perjanjian Kerja Sama' ? 'selected' : ''}>Perjanjian Kerja Sama</option>
                  <option value="Nota Kesepahaman" ${r.jenisKerjasama === 'Nota Kesepahaman' ? 'selected' : ''}>Nota Kesepahaman</option>
                  <option value="Kesepakatan Bersama" ${r.jenisKerjasama === 'Kesepakatan Bersama' ? 'selected' : ''}>Kesepakatan Bersama</option>
                  <option value="Kontrak Kerja" ${r.jenisKerjasama === 'Kontrak Kerja' ? 'selected' : ''}>Kontrak Kerja</option>
                  <option value="Lainnya" ${!['Perjanjian Kerja Sama', 'Nota Kesepahaman', 'Kesepakatan Bersama', 'Kontrak Kerja'].includes(r.jenisKerjasama) && r.jenisKerjasama ? 'selected' : ''}>Lainnya</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Nomor Dokumen</label>
                <input type="text" class="form-input" id="inpNoDokumen" value="${r.noPihak1 || r.noPihak2 || ''}" placeholder="Nomor Dokumen">
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Pihak 1 (KKP) <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="inpUnitSign" value="${r.pihak1 || ''}" placeholder="Contoh: Dirjen PRL" required>
              </div>
              <div class="form-group">
                <label class="form-label">Nomor Pihak 1 <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="inpNo1" value="${r.noPihak1 || ''}" placeholder="Contoh: xx/xxx/xx/xx/2026" required>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Pihak 2 (Mitra) <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="inpJabatanSign" value="${r.pihak2 || ''}" placeholder="Contoh: Pemkab Bandung" required>
              </div>
              <div class="form-group">
                <label class="form-label">Nomor Pihak 2 <span style="color:var(--danger-500)">*</span></label>
                <input type="text" class="form-input" id="inpNo2" value="${r.noPihak2 || ''}" placeholder="Contoh: xx/xxx/xx/xx/2026" required>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Tanggal Mulai <span style="color:var(--danger-500)">*</span></label>
                <input type="date" class="form-input" id="inpMulai" value="${this.formatDateForInput(r.tanggalMulai)}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Berlaku Hingga <span style="color:var(--danger-500)">*</span></label>
                <input type="date" class="form-input" id="inpHingga" value="${this.formatDateForInput(r.tanggalSelesai)}" required>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Masa Berlaku</label>
                <input type="text" class="form-input" id="inpMasa" value="${r.masaBerlaku || ''}" placeholder="Contoh: 5 Tahun">
              </div>
              <div class="form-group">
                <label class="form-label">Status <span style="color:var(--danger-500)">*</span></label>
                <select class="form-select" id="inpStatus" required>
                  <option value="Berlaku" ${r.status === 'Berlaku' ? 'selected' : ''}>Berlaku</option>
                  <option value="Tidak Berlaku" ${r.status === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Import File Dokumen Pendukung (Opsional)</label>
              <div style="border:2px dashed var(--neutral-300);padding:24px;border-radius:8px;text-align:center;cursor:pointer;background:var(--neutral-50)" onclick="document.getElementById('fileUpload').click()">
                <span style="font-size:28px;margin-bottom:8px;display:block">📄</span>
                <div style="color:var(--neutral-600);font-weight:600;margin-bottom:4px;font-size:14px">Klik untuk memilih file</div>
                <div style="color:var(--neutral-400);font-size:12px">Mendukung file Excel, PDF, dan Word (Maksimal 10MB)</div>
                <input type="file" id="fileUpload" style="display:none" accept=".pdf,.doc,.docx,.xls,.xlsx" onchange="document.getElementById('fileLabel').textContent = this.files[0] ? 'File Terpilih: ' + this.files[0].name : '';">
              </div>
              <div id="fileLabel" style="font-size:13px;color:var(--primary-600);margin-top:8px;font-weight:600"></div>
            </div>

            <div class="form-group">
              <label class="form-label">Link Dokumen Web (Jika Ada)</label>
              <input type="url" class="form-input" id="inpDokumen" value="${r.linkDokumen || ''}" placeholder="https://...">
            </div>

            <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:12px;padding-top:20px;border-top:1px solid var(--neutral-200);">
              <button type="button" class="btn btn-ghost" onclick="KebijakanPrioritasPage.closeForm()">Batal</button>
              <button type="submit" class="btn btn-primary" style="background:var(--primary-900);color:#fff;display:flex;align-items:center;gap:6px;"><span style="font-size:14px">💾</span> ${isEdit ? 'Simpan Perubahan' : 'Simpan Data'}</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.id = 'kpModalContainer';
    div.innerHTML = modalHtml;
    document.body.appendChild(div);
  },

  closeForm() {
    const el = document.getElementById('kpModalContainer');
    if (el) el.remove();
  },

  saveForm(index) {
    // Inline Validation
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    const requiredFields = [
      { id: 'inpKategori', msg: 'Kategori mitra wajib dipilih' },
      { id: 'inpMitra', msg: 'Nama mitra wajib diisi' },
      { id: 'inpJenis', msg: 'Jenis kerja sama wajib dipilih' },
      { id: 'inpUnitSign', msg: 'Pihak 1 wajib diisi' },
      { id: 'inpNo1', msg: 'Nomor Pihak 1 wajib diisi' },
      { id: 'inpJabatanSign', msg: 'Pihak 2 wajib diisi' },
      { id: 'inpNo2', msg: 'Nomor Pihak 2 wajib diisi' },
      { id: 'inpMulai', msg: 'Tanggal mulai wajib diisi' },
      { id: 'inpHingga', msg: 'Tanggal selesai wajib diisi' },
      { id: 'inpStatus', msg: 'Status wajib dipilih' }
    ];

    let isValid = true;
    requiredFields.forEach(field => {
      const el = document.getElementById(field.id);
      if (el && !el.value.trim()) {
        el.classList.add('is-invalid');
        const err = document.createElement('div');
        err.className = 'invalid-feedback';
        err.innerText = field.msg;
        el.parentNode.appendChild(err);
        isValid = false;
      }
    });

    if (!isValid) return;

    const mitra = document.getElementById('inpMitra').value;
    const kategori = document.getElementById('inpKategori').value;

    let finalLinkDokumen = document.getElementById('inpDokumen').value;
    const fileInput = document.getElementById('fileUpload');
    if (fileInput && fileInput.files.length > 0) {
      finalLinkDokumen = URL.createObjectURL(fileInput.files[0]);
    }

    const newData = {
      kategoriMitra: kategori,
      mitra: mitra,
      jenisKerjasama: document.getElementById('inpJenis').value,
      pihak1: document.getElementById('inpUnitSign').value,
      pihak2: document.getElementById('inpJabatanSign').value,
      noPihak1: document.getElementById('inpNo1').value,
      noPihak2: document.getElementById('inpNo2').value,
      masaBerlaku: document.getElementById('inpMasa').value,
      tanggalMulai: this.formatDateForSave(document.getElementById('inpMulai').value),
      tanggalSelesai: this.formatDateForSave(document.getElementById('inpHingga').value),
      status: document.getElementById('inpStatus').value,
      linkDokumen: finalLinkDokumen,
      tahun: new Date().getFullYear().toString()
    };

    if (index === -1) {
      this.data.unshift(newData);
      App.showToast('Data kerja sama berhasil ditambahkan!', 'success');
    } else {
      newData.tahun = this.data[index].tahun;
      this.data[index] = newData;
      App.showToast('Data kerja sama berhasil diperbarui!', 'success');
    }

    this.saveToStorage();
    this.closeForm();
    App.renderPage();
  },

  deleteItem(idx) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      this.data.splice(idx, 1);
      this.saveToStorage();
      App.showToast('Data berhasil dihapus', 'success');
      App.renderPage();
    }
  },

  saveToStorage() {
    localStorage.setItem('kp_prioritas_persistent', JSON.stringify(this.data));
  },

  setPage(p) {
    this.state.page = p;
    this.updateUI();
  },

  handleSearch(val) {
    this.state.searchQuery = val.toLowerCase();
    this.state.page = 1;
    
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.updateUI();
    }, 300);
  },

  handleFilter(key, val) {
    this.state[key] = val;
    this.state.page = 1;
    this.updateUI();
  },

  resetFilters() {
    this.state.searchQuery = '';
    this.state.filterYear = 'all';
    this.state.filterCategory = 'all';
    this.state.filterStatus = 'all';
    this.state.page = 1;

    // Sync input values back to DOM
    const s = document.getElementById('kp-search'); if(s) s.value = '';
    const y = document.getElementById('kp-filter-year'); if(y) y.value = 'all';
    const c = document.getElementById('kp-filter-cat'); if(c) c.value = 'all';
    const st = document.getElementById('kp-filter-status'); if(st) st.value = 'all';

    this.updateUI();
  },

  exportToExcel() {
    App.showToast('Sedang menyiapkan data untuk ekspor...', 'info');

    setTimeout(() => {
      const filteredData = this.getFilteredData();
      if (filteredData.length === 0) {
        App.showToast('Tidak ada data untuk diekspor', 'warning');
        return;
      }

      let csv = 'No,Tahun,Kategori Mitra,Nama Mitra,Jenis Kerja Sama,Unit Sign,Jabatan Sign,Status\n';
      filteredData.forEach((r, i) => {
        csv += `${i + 1},${r.tahun || '-'},${r.kategoriMitra || '-'},"${r.mitra || '-'}","${r.jenisKerjasama || '-'}","${r.pihak1 || '-'}","${r.pihak2 || '-'}",${r.status || '-'}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Data_Kebijakan_Prioritas_${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      App.showToast('Data berhasil diekspor ke CSV/Excel!', 'success');
    }, 1000);
  },

  getFilteredData() {
    return this.data.filter(r => {
      const q = this.state.searchQuery.trim().toLowerCase();
      const matchSearch = !q ||
        String(r.mitra || '').toLowerCase().includes(q) ||
        String(r.jenisKerjasama || '').toLowerCase().includes(q) ||
        String(r.pihak1 || '').toLowerCase().includes(q) ||
        String(r.pihak2 || '').toLowerCase().includes(q) ||
        String(r.judul || '').toLowerCase().includes(q);

      const matchYear = this.state.filterYear === 'all' || String(r.tahun || '').trim() === String(this.state.filterYear).trim();
      const matchCategory = this.state.filterCategory === 'all' || String(r.kategoriMitra || '').toLowerCase().trim() === String(this.state.filterCategory).toLowerCase().trim();

      const s = String(r.status || '').toLowerCase();
      const matchStatus = this.state.filterStatus === 'all' ||
        (this.state.filterStatus === 'Berlaku' && s.includes('berlaku') && !s.includes('tidak')) ||
        (this.state.filterStatus === 'Tidak Berlaku' && s.includes('tidak'));

      return matchSearch && matchYear && matchCategory && matchStatus;
    });
  },

  afterRender() {
    this.updateUI();
  },

  render() {
    const years = [...new Set(this.data.map(d => String(d.tahun || '').trim()).filter(y => /^20\d{2}$/.test(y)))].sort((a, b) => b - a);
    const categories = [...new Set(this.data.map(d => String(d.kategoriMitra || '').trim()).filter(Boolean))].sort();

    return `
      <div class="page-header" style="margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h1 class="page-title">Database Dukungan Kebijakan Prioritas</h1>
          <p class="text-muted" style="margin-top:4px">Database dukungan kebijakan prioritas nasional</p>
        </div>
        <div style="display:flex;gap:12px">
          <button class="btn btn-ghost" style="border:1px solid var(--neutral-300)" onclick="KebijakanPrioritasPage.exportToExcel()">📥 Ekspor CSV</button>
          <button class="btn btn-primary" style="background:var(--primary-600);color:#fff;" onclick="KebijakanPrioritasPage.openForm()">+ Tambah Data</button>
        </div>
      </div>

      <!-- RINGKASAN DATA (STATS) -->
      <div id="kp-stats-container">
        <!-- Stats cards load here -->
      </div>

      <!-- FILTER & SEARCH BAR -->
      <div class="card glass page-filter-bar" style="margin-bottom:24px;padding:24px;border:none;box-shadow:var(--shadow-lg);background:rgba(255,255,255,0.9);backdrop-filter:blur(10px);">
        <div class="search-container" style="flex:2;min-width:250px;">
          <span class="search-icon" style="position:absolute;left:15px;top:50%;transform:translateY(-50%);color:var(--neutral-400);">🔍</span>
          <input type="text" id="kp-search" class="search-input" style="width:100%;padding:12px 12px 12px 45px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" placeholder="Cari mitra, jenis, nomor, atau pihak..." value="${this.state.searchQuery}" oninput="KebijakanPrioritasPage.handleSearch(this.value)" onkeydown="if(event.key==='Enter') event.preventDefault()">
        </div>
        
        <div style="flex:1;min-width:100px;">
          <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Tahun</label>
          <select id="kp-filter-year" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="KebijakanPrioritasPage.handleFilter('filterYear', this.value)">
            <option value="all">Semua</option>
            ${years.map(y => `<option value="${y}" ${this.state.filterYear === y ? 'selected' : ''}>${y}</option>`).join('')}
          </select>
        </div>

        <div style="flex:1.5;min-width:160px;">
          <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Kategori</label>
          <select id="kp-filter-cat" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="KebijakanPrioritasPage.handleFilter('filterCategory', this.value)">
            <option value="all">Semua Kategori</option>
            ${categories.map(c => `<option value="${c}" ${this.state.filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>

        <div style="flex:1.5;min-width:160px;">
          <label style="font-size:12px;font-weight:700;color:var(--neutral-800);display:block;margin-bottom:8px;">Status</label>
          <select id="kp-filter-status" class="form-select" style="width:100%;padding:12px;border-radius:var(--radius-md);border:1px solid var(--neutral-200);background:#fff;font-size:14px;" onchange="KebijakanPrioritasPage.handleFilter('filterStatus', this.value)">
            <option value="all">Semua Status</option>
            <option value="Berlaku" ${this.state.filterStatus === 'Berlaku' ? 'selected' : ''}>Berlaku</option>
            <option value="Tidak Berlaku" ${this.state.filterStatus === 'Tidak Berlaku' ? 'selected' : ''}>Tidak Berlaku</option>
          </select>
        </div>

        <button class="btn btn-ghost btn-sm" style="color:var(--danger-600);font-weight:600;margin-bottom:6px;flex-shrink:0;" onclick="KebijakanPrioritasPage.resetFilters()">✕ Reset</button>
      </div>

      <div id="kp-table-container">
        <!-- Table load here -->
      </div>
    `;
  },

  updateUI() {
    const statsContainer = document.getElementById('kp-stats-container');
    const tableContainer = document.getElementById('kp-table-container');
    if (!statsContainer || !tableContainer) return;

    if (this.renderTimeout) clearTimeout(this.renderTimeout);
    tableContainer.innerHTML = this.renderSkeleton();

    this.renderTimeout = setTimeout(() => {
      const filteredData = this.getFilteredData();
      const totalData = filteredData.length;
      const totalPages = Math.max(1, Math.ceil(totalData / this.state.perPage));
      const startIndex = (this.state.page - 1) * this.state.perPage;
      const paginatedData = filteredData.slice(startIndex, startIndex + this.state.perPage);

    const aktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak')).length;
    const tidakAktifCount = filteredData.filter(r => String(r.status || '').toLowerCase().includes('tidak')).length;
    const prosesCount = totalData - aktifCount - tidakAktifCount;

    statsContainer.innerHTML = `
      <!-- CARD STATISTIK -->
      <div class="stats-grid" style="margin-bottom:32px">
        <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--primary-50) 100%); position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">📊</div>
          <div style="font-size:13px;font-weight:700;color:var(--primary-700);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Total Kerja Sama</div>
          <div style="font-size:32px;font-weight:800;color:var(--primary-900);line-height:1">${totalData}</div>
          <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Data terfilter</div>
        </div>
        <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--success-100) 100%); position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">✅</div>
          <div style="font-size:13px;font-weight:700;color:var(--success-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Berlaku</div>
          <div style="font-size:32px;font-weight:800;color:var(--success-600);line-height:1">${aktifCount}</div>
          <div style="font-size:12px;color:var(--success-500);margin-top:8px">Status aktif</div>
        </div>
        <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--danger-100) 100%); position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">⚠️</div>
          <div style="font-size:13px;font-weight:700;color:var(--danger-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Tidak Berlaku</div>
          <div style="font-size:32px;font-weight:800;color:var(--danger-600);line-height:1">${tidakAktifCount}</div>
          <div style="font-size:12px;color:var(--danger-500);margin-top:8px">Masa berlaku habis</div>
        </div>
        <div class="card" style="padding:24px; border:none; box-shadow:var(--shadow-md); background: linear-gradient(135deg, #fff 0%, var(--neutral-100) 100%); position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-10px; font-size:60px; opacity:0.05;">⚙️</div>
          <div style="font-size:13px;font-weight:700;color:var(--neutral-600);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Lainnya</div>
          <div style="font-size:32px;font-weight:800;color:var(--neutral-800);line-height:1">${prosesCount}</div>
          <div style="font-size:12px;color:var(--neutral-500);margin-top:8px">Status lainnya</div>
        </div>
      </div>
    `;

    tableContainer.innerHTML = `

      <!-- DATA TABLE -->
      <div class="card" style="overflow-x:auto; width: 100%; border-radius: var(--radius-md);">
        <table class="table" style="font-size:13px; min-width: 1400px; width: 100%;">
          <thead>
            <tr style="background: var(--neutral-50);">
              <th style="white-space:nowrap; padding: 12px 16px;">No</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Tahun</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Kategori Mitra</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Nama Mitra</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Jenis Kerja Sama</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Pihak 1 (KKP)</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Pihak 2 (Mitra)</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Tgl Mulai</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Berlaku Hingga</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Status</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Dokumen</th>
              <th style="white-space:nowrap; padding: 12px 16px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedData.length === 0 ? this.renderEmptyState() :
        paginatedData.map((r, i) => `
              <tr style="background: #fff; transition: all 0.2s; border-bottom: 1px solid var(--neutral-100);" onmouseover="this.style.background='var(--primary-50)'" onmouseout="this.style.background='#fff'">
                <td style="padding: 16px; color:var(--neutral-500); font-weight:600;">${startIndex + i + 1}</td>
                <td style="padding: 16px;">${r.tahun || '-'}</td>
                <td style="padding: 16px;"><span class="badge badge-info">${r.kategoriMitra || '-'}</span></td>
                <td style="padding: 16px; max-width: 250px; white-space: normal; line-height: 1.5;"><strong style="color:var(--primary-900);">${r.mitra || '-'}</strong></td>
                <td style="padding: 16px; white-space:nowrap; color:var(--neutral-700);">${r.jenisKerjasama || '-'}</td>
                <td style="padding: 16px; max-width: 200px; white-space: normal; line-height: 1.4;"><div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak1 || '-'}</div><div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak1 || ''}</div></td>
                <td style="padding: 16px; max-width: 200px; white-space: normal; line-height: 1.4;"><div style="font-weight:700;font-size:0.8rem;color:var(--primary-800);margin-bottom:4px">${r.pihak2 || '-'}</div><div style="font-size:0.7rem;color:var(--neutral-500);word-break:break-all;opacity:0.8">${r.noPihak2 || ''}</div></td>
                <td style="padding: 16px; white-space: nowrap; color:var(--neutral-600);">${r.tanggalMulai || '-'}</td>
                <td style="padding: 16px; white-space: nowrap; color:var(--neutral-600);">${r.tanggalSelesai || '-'}</td>
                <td style="padding: 16px; white-space: nowrap;">
                  ${String(r.status || '').toLowerCase().includes('berlaku') && !String(r.status || '').toLowerCase().includes('tidak') ? '<span class="badge badge-success">● Berlaku</span>' :
            String(r.status || '').toLowerCase().includes('tidak') ? '<span class="badge badge-danger">○ Tidak Berlaku</span>' :
              `<span class="badge badge-info">${r.status || '-'}</span>`}
                </td>
                <td style="padding: 16px; white-space: nowrap;">
                  ${r.linkDokumen ? `<a href="${r.linkDokumen}" target="_blank" class="btn btn-ghost btn-sm" style="padding:6px 12px; background:var(--primary-50); color:var(--primary-700); border-radius:var(--radius-md); font-weight:600;">📄 Lihat</a>` : '-'}
                </td>
                <td style="padding: 16px; white-space:nowrap; text-align:center;">
                  <button class="btn btn-primary btn-sm" onclick="KebijakanPrioritasPage.openForm(${startIndex + i})" style="padding:8px 12px; border-radius: var(--radius-md); background:linear-gradient(135deg, var(--primary-600), var(--primary-800)); border:none; box-shadow: var(--shadow-sm); font-weight:600;">✏️ Edit</button>
                  <button class="btn btn-ghost btn-sm" onclick="KebijakanPrioritasPage.deleteItem(${startIndex + i})" style="padding:8px 12px; color:var(--danger-600); font-weight:600;">🗑️ Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <!-- PAGINATION -->
        <div style="position: sticky; bottom: 0; background: #fff; padding:16px;border-top:1px solid var(--neutral-200);display:flex;justify-content:space-between;align-items:center;color:var(--neutral-500);font-size:13px">
          <div>Menampilkan ${totalData === 0 ? 0 : startIndex + 1} - ${Math.min(startIndex + this.state.perPage, totalData)} dari ${totalData} data</div>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-sm" ${this.state.page === 1 ? 'disabled' : ''} onclick="KebijakanPrioritasPage.setPage(${this.state.page - 1})">Sebelumnya</button>
            <span style="padding: 4px 10px; font-weight: 500;">Halaman ${this.state.page} / ${totalPages}</span>
            <button class="btn btn-ghost btn-sm" ${this.state.page === totalPages || totalPages === 0 ? 'disabled' : ''} onclick="KebijakanPrioritasPage.setPage(${this.state.page + 1})">Selanjutnya</button>
          </div>
        </div>
      </div>
    `;
    }, 400); // Skeleton timeout
  },

  renderSkeleton() {
    const rows = Array(5).fill(`
      <tr style="border-bottom: 1px solid var(--neutral-100);">
        ${Array(12).fill('<td style="padding: 16px;"><div class="skeleton-box" style="height:20px; width:100%; border-radius:4px;"></div></td>').join('')}
      </tr>
    `).join('');
    return `
      <div class="card" style="overflow-x:auto; width: 100%; border-radius: var(--radius-md);">
        <table class="table" style="font-size:13px; min-width: 1400px; width: 100%;">
          <thead>
            <tr style="background: var(--neutral-50);">
              ${Array(12).fill('<th style="padding: 12px 16px;"><div class="skeleton-box" style="height:16px; width:80%; border-radius:4px;"></div></th>').join('')}
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  },

  renderEmptyState() {
    return `
      <tr>
        <td colspan="12" style="text-align:center; padding: 64px 24px; background: #fff;">
          <div style="display:flex; flex-direction:column; align-items:center; gap: 16px;">
            <div style="font-size: 48px; opacity: 0.5;">🔍</div>
            <div>
              <h3 style="margin:0 0 8px 0; color:var(--neutral-800); font-weight:700;">Data Tidak Ditemukan</h3>
              <p style="margin:0; color:var(--neutral-500); font-size:14px; max-width:400px;">Kami tidak dapat menemukan data dengan kata kunci atau filter tersebut. Silakan gunakan kata kunci lain.</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="KebijakanPrioritasPage.state.searchQuery=''; KebijakanPrioritasPage.state.filterYear='all'; KebijakanPrioritasPage.state.filterMitra='all'; KebijakanPrioritasPage.state.filterStatus='all'; document.getElementById('kp-search').value=''; document.getElementById('kp-filter-year').value='all'; document.getElementById('kp-filter-mitra').value='all'; document.getElementById('kp-filter-status').value='all'; KebijakanPrioritasPage.updateUI();" style="margin-top: 8px;">Reset Filter</button>
          </div>
        </td>
      </tr>
    `;
  }
};
