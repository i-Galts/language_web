$(document).ready(function () {
    var table = $('#example').DataTable();

    $('#example tbody').on( 'click', 'tr',  (event) =>  {
        console.log( table.row( event.currentTarget ).data() );
    } );

    table.rows().every( function () {
        var d = this.data();
     
        d.counter++; // update data source for the row
     
        this.invalidate(); // invalidate the data DataTables has cached for this row
    } );

    table.draw();
});