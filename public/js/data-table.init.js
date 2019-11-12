$(document).ready(function() {
    var table = $('#data-table').DataTable( {
        responsive: true
    } );
 
    new $.fn.dataTable.FixedHeader( table );
} );