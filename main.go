package main

import (
	_ "embed"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

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
	app.Bind(readFile)
	app.Run()
}

func getFiles() ([]string, error) {
	root := "/Users/adamdilger/Documents/notes"

	var files []string
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() && strings.HasSuffix(info.Name(), ".md") {
			files = append(files, path)
		}
		return nil
	})

	return files, err
}

func readFile(file string) (string, error) {
	a, err := ioutil.ReadFile(file)

	if err != nil {
		return "", err
	}

	return string(a), nil
}
