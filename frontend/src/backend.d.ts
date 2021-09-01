import TreeEntity from "./model/TreeEntity";

interface Files {
	GetFiles(): TreeEntity;

	ReadFileForDir(subPath: string): string;
	ReadFile(subPath: string, name: string): string;

	SaveFileForDir(subPath: string, content: string): string;
	SaveFile(subPath: string, name: string, content: string): string;
}

interface backend {
	Files: Files;
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
}

declare const Bridge: {
	Start(callback: () => void): void;
};

export default Bridge;
