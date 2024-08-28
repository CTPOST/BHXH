$(document).ready(function() {
    $('#customRange1').on('input', function() {
        var GioiTinh = window.getComputedStyle(document.querySelector('.knobs'), '::before').getPropertyValue('content');
        GioiTinh = GioiTinh.replace(/['"]/g, '');
        var value = $(this).val();
        $('#rangeValue').text(formatNumber(value)+'đ/tháng.');

        var MucDongGiam1Thang = value*0.22;
        var MucDong1Thang = MucDongGiam1Thang-33000;
        $('#MucDongGiam1Thang').text(formatNumber(MucDongGiam1Thang));
        $('#MucDong1Thang').text(formatNumber(MucDong1Thang));

        var MucDongGiam3Thang = MucDongGiam1Thang*3;
        var MucDong3Thang = MucDong1Thang*3;
        $('#MucDongGiam3Thang').text(formatNumber(MucDongGiam3Thang));
        $('#MucDong3Thang').text(formatNumber(MucDong3Thang));

        var MucDongGiam6Thang = MucDongGiam1Thang*6;
        var MucDong6Thang = MucDong1Thang*6;
        $('#MucDongGiam6Thang').text(formatNumber(MucDongGiam6Thang));
        $('#MucDong6Thang').text(formatNumber(MucDong6Thang));

        var MucDongGiam12Thang = MucDongGiam1Thang*12;
        var MucDong12Thang = MucDong1Thang*12;
        $('#MucDongGiam12Thang').text(formatNumber(MucDongGiam12Thang));
        $('#MucDong12Thang').text(formatNumber(MucDong12Thang));
        
        if(GioiTinh == "NAM"){
            var LuongHuu = value*0.55;
            $('#LuongHuu').text(formatNumber(LuongHuu.toFixed(0))+"đ/tháng.");
        }else{
            var LuongHuu = value*0.45;
            $('#LuongHuu').text(formatNumber(LuongHuu.toFixed(0))+"đ/tháng.");
        }
    });

    $('#GioiTinh').on('change', function() {
        var GioiTinh = window.getComputedStyle(document.querySelector('.knobs'), '::before').getPropertyValue('content');
        GioiTinh = GioiTinh.replace(/['"]/g, '');
        var value = $("#customRange1").val();
        if(GioiTinh == "NAM"){
            var LuongHuu = value*0.55;
            $('#LuongHuu').text(formatNumber(LuongHuu.toFixed(0))+"đ/tháng.");
        }else{
            var LuongHuu = value*0.45;
            $('#LuongHuu').text(formatNumber(LuongHuu.toFixed(0))+"đ/tháng.");
        }
    });
    

    $('#genderToggle').click(function() {
        var isChecked = $(this).attr('data-checked') === 'true';
        $(this).attr('data-checked', !isChecked);
        $(this).attr('aria-checked', !isChecked);
    });
});

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
