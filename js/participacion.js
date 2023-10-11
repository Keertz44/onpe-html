const getDPD = async() => {
    const id = new URLSearchParams( window.location.search ).get('id')
    const parametros = id.split('/')

    let ruta = parametros[0] 
    if ( parametros.length > 1 ) ruta += "/" + parametros[1]
    if ( parametros.length > 2 ) ruta += "/" + parametros[2]

    console.log(ruta)
    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/participacion/${ruta}`)

    //Ambito
    const aNacional = ['Ámbito' , 'Departamento' , 'Provincia' , 'Distrito']
    const aExtranjero = ['Ámbito' , 'Continente' , 'País' , 'Ciudad']

    let ambito = ''
    for ( i=0; i < parametros.length; i++ )
    ambito += ( parametros[0] == 'Nacional' ? aNacional[i] : aExtranjero[i] ) + ' : ' + parametros[i] + '</br>'

    document.getElementById( 'ambito' ).innerHTML = ambito

    if ( data.status == 200 && parametros.length < 4 ){
        const dpd = await data.json()
        let html = `
        <p class="subtitle">Consulta de participación DETALLADO </p>
        <div id="page-wrap">
            <table class="table21">
                <tbody id="resultados">
                    <tr class="titulo_tabla">
                        <td>${ ( parametros[0] == 'Nacional' ? aNacional[ parametros.length ] : aExtranjer[ parametros.length ])}</td>
                        <td>TOTAL ASISTENTES</td>
                        <td>% TOTAL ASISTENTES</td>
                        <td>TOTAL AUSENTES</td>
                        <td>% TOTAL AUSENTES</td>
                        <td>ELECTORES HÁBILES</td>
                    </tr>`

                    dpd.forEach( fila => {
                        let ruta_dpd = ruta + '/' + fila.DPD;
                        html += 
                            `<tr onclick="location.href='participacion_total.html?id=${ruta_dpd}'" onmouseover="this.style.cursor = &quot;pointer&quot;; this.style.color = &quot;grey&quot;" onmouseout="this.style.color = &quot;black&quot;" style="cursor: pointer; color: black;">
                                <td>${fila.DPD}</td>
                                <td>${fila.TV}</td>
                                <td>${fila.PTV}</td>
                                <td>${fila.TA}</td>
                                <td>${fila.PTA}</td>
                                <td>${fila.EH}</td>
                            </tr>`
                        });

                    html += 
                    `<tr>
                        <td>TOTALES</td>
                        <td>17,953,367</td>
                        <td>81.543%</td>
                        <td>4,063,663</td>
                        <td>18.457%</td>
                        <td>22,017,030</td>
                    </tr>
                </tbody>
            </table>
        </div>`

     document.getElementById( 'resultados_onpe' ).innerHTML = html;
}
}
getDPD()