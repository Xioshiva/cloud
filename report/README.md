# How to compile the report
## Dependencies
To compile the report on an ubuntu based OS, you need the following package:
* texlive-latex-base

To compile it, you will need to use the following command:
```
pdflatex path_to_file
```

## Setting up latex

In order to install the necessary latex packages, you will need to set up your tlmgr usertree with the following command:

```
tlmgr init-usertree
```

## Installing the packages

I'm not too sure how to install them automatically, maybe the following command (make sure you have texliveonfly installed):
```
texliveonfly report.tex
```
installs the missing packages, but I didn't get to test it.
If that fails, you can use:
```
tlmgr install package_name
```
