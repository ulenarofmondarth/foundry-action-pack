# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Action Pack (v2)'
copyright = 'Mondarth.com'
author = 'Ulenar of Mondarth'
release = '13.0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['sphinx_rtd_theme', 'sphinx.ext.todo', 'sphinxcontrib.mermaid', 'sphinxcontrib.youtube', 'sphinx_design']

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']


# -- Esure TODOs are output (these should all be cleared before a commit)
# https://www.sphinx-doc.org/en/master/usage/extensions/todo.html#directive-todo

todo_include_todos = True
todo_emit_warnings = True

rst_prolog = """
.. |LSP| replace:: :abbr:`LSP (Language Server Protocol)`
.. |HMR| replace:: :abbr:`HMR (Hot Module Reload)`
.. |IMHO| replace:: :abbr:`IMHO (In My Humble Opinion)`
"""
