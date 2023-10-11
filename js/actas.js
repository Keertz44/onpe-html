function validText(evt, ) {
    let code = (evt.which) ? evt.which : evt.keyCode;

    return ( code == 8 || ( code >= 48 && code <= 57 ) );
}