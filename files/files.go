package files

import (
	"os"
	"path/filepath"
)

type Files struct {
	root string
}

type TreeEntry struct {
	Name     string
	SubPath  string
	IsDir    bool
	Children []TreeEntry
}

func NewFiles() *Files {
	dirname, _ := os.UserHomeDir()
	root := dirname + "/Documents/notes"

	return &Files{
		root: root,
	}
}

func (f Files) GetFiles() (*TreeEntry, error) {
	return walkFiles(f.root, "", "")
}

func (f Files) ReadFileForDir(subPath string) (string, error) {
	return f.ReadFile(subPath, "index.md")
}

func (f Files) ReadFile(subPath, name string) (string, error) {
	path := filepath.Join(f.root, subPath, name)

	if _, err := os.Stat(path); os.IsNotExist(err) {
		return "", nil
	}

	a, err := os.ReadFile(path)

	if err != nil {
		return "", err
	}

	return string(a), nil
}

func (f Files) SaveFileForDir(subPath, content string) error {
	return f.SaveFile(subPath, "index.md", content)
}

func (f Files) SaveFile(subPath, name, content string) error {
	path := filepath.Join(f.root, subPath, name)
	err := os.WriteFile(path, []byte(content), 0644)

	if err != nil {
		return err
	}

	return nil
}
