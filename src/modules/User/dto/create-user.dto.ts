export class CreateUserDto {
	name!: string;
	email!: string;
	roll_number!: string;
	avatar_url?: string;
	about?: string;
}
