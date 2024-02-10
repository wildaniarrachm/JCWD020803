function formatRupiah(angka) {
  let reverse = angka.toString().split('').reverse().join('');
  let ribuan = reverse.match(/\d{1,3}/g);
  let formatted = ribuan.join('.').split('').reverse().join('');
  return `Rp ${formatted},00`;
}

export default formatRupiah;
