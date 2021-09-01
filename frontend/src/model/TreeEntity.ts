export default interface TreeEntity {
	Children: Array<TreeEntity>;
	IsDir: Boolean;
	SubPath: string;
	Name: string;
}
