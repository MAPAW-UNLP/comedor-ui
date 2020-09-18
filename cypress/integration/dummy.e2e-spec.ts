it( 'Loads the root page', ( ) => {
	cy.goToRoute( 'root' );
	cy.contains( /comedor universitario/i );
});