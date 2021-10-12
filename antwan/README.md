# Exoscale Instance Creator Program

## Dependencies
To run this program, you need the following:

- python3
- pip
- An Exoscale account, and its API Key

## Installing the exoscale library for python

```
pip install exoscale
```
## Setting up your Exoscale API Key

* Get your credentials and your key and secret
* In your home directory, create a folder named "***.exoscale***"
* Create a file called "***config.tml***"
* And write the following in the
```
    default_profile = "default"
    [[profiles]]
    name = "default"
    api_key = "<KEY>"
    api_secret = "<SECRET>"
```
