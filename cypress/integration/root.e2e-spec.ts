describe( 'Root route', ( ) => {

	it( 'Displays the title "Comedor Universitario" in the navigation bar', ( ) => {
		cy.visitRoute( 'root' );
		cy.contains( /comedor universitario/i );
	});

});