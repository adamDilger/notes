interface backend {
	getFiles(): TreeEntity;

	readFileForDir(subPath: string): string;
	readFile(subPath: string, name: string): string;

	saveFileForDir(subPath: string): string;
	saveFile(subPath: string, name: string): string;
}

type logFunction = (message: string) => void;

interface wails {
	Browser: {
		OpenURL(url: string): Promise<void>;
		OpenFile(url: string): Promise<void>;
	};
	Events: {
		Emit(eventName: string, ...optionalData: any[]): void;
		On(eventName: string, callback: (...optionalData: any[]) => void): void;
	};
	Log: {
		Debug: logFunction;
		Error: logFunction;
		Fatal: logFunction;
		Info: logFunction;
		Warning: logFunction;
	};
}

declare global {
	interface Window {
		backend: backend;
		wails: wails;
	}

	interface TreeEntity {
		Children: Array<TreeEntity>;
		IsDir: Boolean;
		SubPath: string;
		Name: string;
	}
}

declare const Bridge: {
	Start(callback: () => void): void;
};

export default Bridge;
