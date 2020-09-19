describe( 'Ruta raiz', ( ) => {

	it( 'Muestra el título "Comedor Universitario" en la barra de navegación', ( ) => {
		cy.visitarRuta( 'raiz' );
		cy.contains( /comedor universitario/i );
	});

});