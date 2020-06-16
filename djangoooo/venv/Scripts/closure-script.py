#!C:\Users\wasee\PycharmProjects\djangoooo\venv\Scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'closure==20191111','console_scripts','closure'
__requires__ = 'closure==20191111'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('closure==20191111', 'console_scripts', 'closure')()
    )
