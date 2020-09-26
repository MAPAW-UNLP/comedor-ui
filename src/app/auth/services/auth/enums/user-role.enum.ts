/**
 * Enum that defines the possible values for the "role" claim in the access token, which descibes the role
 * of the authenticated user: either a client or an employee for a kitchen site.
 */
export enum UserRole {
	Client = 'client',
	KitchenSiteEmployee = 'employee',
}