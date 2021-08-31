package main

import (
	"os"
	"path/filepath"
	"strings"
)

func WalkFiles(root, subpath, name string) (*TreeEntry, error) {
	files, err := os.ReadDir(filepath.Join(root, subpath))
	if err != nil {
		return nil, err
	}

	var out TreeEntry
	out.IsDir = true
	out.SubPath = subpath
	out.Name = name

	for _, file := range files {
		if file.IsDir() {
			child, err := WalkFiles(root, filepath.Join(subpath, file.Name()), file.Name())
			if err != nil {
				return nil, err
			}

			out.Children = append(out.Children, *child)
		} else if strings.HasSuffix(file.Name(), ".md") && file.Name() != "index.md" {
			var child TreeEntry
			child.Name = file.Name()
			child.SubPath = subpath
			out.Children = append(out.Children, child)
		}
	}

	return &out, nil
}
