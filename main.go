package main

import (
	_ "embed"
	"fmt"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails"
)

func basic() string {
	return "Hello World!"
}

//go:embed frontend/dist/app.js
var js string

//go:embed frontend/dist/app.css
var css string

func main() {
	app := wails.CreateApp(&wails.AppConfig{
		Width:     1024,
		Height:    768,
		Resizable: true,
		Title:     "Notes",
		JS:        js,
		CSS:       css,
		Colour:    "#131313",
	})
	app.Bind(basic)
	app.Bind(getFiles)
	app.Bind(readFileForDir)
	app.Bind(readFile)
	app.Run()
}

type TreeEntry struct {
	Name     string
	SubPath  string
	IsDir    bool
	Children []TreeEntry
}

func getFiles() (*TreeEntry, error) {
	dirname, _ := os.UserHomeDir()
	root := dirname + "/Documents/notes"

	return WalkFiles(root, "", "")
}

func readFileForDir(subPath string) (string, error) {
	dirname, _ := os.UserHomeDir()
	root := dirname + "/Documents/notes"

	path := filepath.Join(root, subPath, "index.md")

	if _, err := os.Stat("/path/to/whatever"); os.IsNotExist(err) {
		return "", nil
	}

	a, err := os.ReadFile(path)

	if err != nil {
		return "", err
	}

	return string(a), nil
}

func readFile(subPath, name string) (string, error) {
	dirname, _ := os.UserHomeDir()
	root := dirname + "/Documents/notes"

	path := filepath.Join(root, subPath, name)
	fmt.Println(path)
	a, err := os.ReadFile(path)

	if err != nil {
		return "", err
	}

	return string(a), nil
}
