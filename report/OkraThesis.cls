% Author Name: José António Portela Areia 
% Author Contact: jose.apareia@gmail.com
% Version: 2.2.5 - 2025/03/15
% Public Repository: https://github.com/joseareia/-thesis
% Wiki/Getting Help: https://github.com/joseareia/-thesis/wiki

%%% Class Information %%%
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{OkraThesis}[2023/12/12  Thesis Class]

\RequirePackage{expl3} % Required for writing LaTeX3 code in this class.

%%% Handle Class Options %%%
\ExplSyntaxOn

\cs_new:Npn \Thesis_check_color:n #1 {
  \tl_set:Nn \l_tmpa_tl { #1 }
  \color_set:nn { \l_tmpa_tl } { #1 }
}

\keys_define:nn { OkraThesis } {
    school .choices:nn =
        { estg, esecs, esslei, esad, estm }
        { \tl_gset:Nn \g_Thesis_myschool_tl { #1 } },
    school / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}
        {Specified~'school'~not~available.~Defaulting~to~'estg'} },
    school .default:n = { estg },
    school .initial:n = { estg },

    coverstyle .choices:nn =
        { classic, bw }
        { \tl_gset:Nn \g_Thesis_mycover_tl { #1 } },
    coverstyle / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'coverstyle'~not~available.~Defaulting~to~'classic'} },
    coverstyle .default:n = { classic },
    coverstyle .initial:n = { classic },

    language .choices:nn = 
        { english, portuguese } 
        { \tl_gset:Nn \g_Thesis_mylanguage_tl { #1 } },
    language / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'language'~not~available.~Defaulting~to~'english'} },
    language .default:n = { english },
    language .initial:n = { english },

    chapterstyle .choices:nn = 
        { classic, fancy, modern } 
        { \tl_gset:Nn \g_Thesis_style_tl { #1 } },
    chapterstyle / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'chapterstyle'~not~available.~Defaulting~to~'classic'} },
    chapterstyle .default:n = { classic },
    chapterstyle .initial:n = { classic },

    docstage .choices:nn = 
        { working, final } 
        { \tl_gset:Nn \g_Thesis_docstage_tl { #1 } },
    docstage / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'docstage'~not~available.~Defaulting~to~'working'} },
    docstage .default:n = { working },
    docstage .initial:n = { working },

    media .choices:nn = 
        { paper, screen } 
        { \tl_gset:Nn \g_Thesis_media_tl { #1 } },
    media / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'media'~not~available.~Defaulting~to~'paper'} },
    media .default:n = { paper },
    media .initial:n = { paper },

    linkcolor .code:n = {
        \tl_gset:Nn \g_Thesis_linkcolor_tl { #1 }
        \Thesis_check_color:n { #1 }
        \tl_if_eq:NNTF \l_tmpa_tl \q_no_value {
            \tl_gset:Nn \g_Thesis_linkcolor_tl { black }
            \ClassWarningNoLine{OkraThesis}{Specified~'linkcolor'~not~available.~Defaulting~to~'black'}
        }
    },
    linkcolor .default:n = { black },
    linkcolor .initial:n = { black },

    doctype .choices:nn = 
        { thesis, report } 
        { \tl_gset:Nn \g_Thesis_doctype_tl { #1 } },
    doctype / unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{Specified~'doctype'~not~available.~Defaulting~to~'thesis'} },
    doctype .default:n = { thesis },
    doctype .initial:n = { thesis },
    
    unknown .code:n = 
        { \ClassWarningNoLine{OkraThesis}{An~unknown~option~was~ignored.~Please~check~the~documentation~to~see~the~available~options} }
}

\newcommand{\LanguageOption}{\g_Thesis_mylanguage_tl}
\newcommand{\SchoolOption}{\g_Thesis_myschool_tl}
\newcommand{\CoverOption}{\g_Thesis_mycover_tl}
\newcommand{\ChapterOption}{\g_Thesis_style_tl}
\newcommand{\DocStageOption}{\g_Thesis_docstage_tl}
\newcommand{\MediaOption}{\g_Thesis_media_tl}
\newcommand{\ColorOption}{\g_Thesis_linkcolor_tl}
\newcommand{\DocTypeOption}{g_Thesis_doctype_tl}

\ProcessKeyOptions[OkraThesis]
\ExplSyntaxOff

%%% Load Master Class %%%
\LoadClass[a4paper,twoside,11pt]{report}

%%% Load Babel Package (Language) %%%
\expandafter\RequirePackage\expandafter[\LanguageOption]{babel}

%%% Required Packages %%%
\RequirePackage{float}
\RequirePackage{ifthen} % Provides conditional statements.
\RequirePackage{etoolbox} % Advanced programming tools for LaTeX.
\RequirePackage{graphicx} % For including and manipulating images.
\RequirePackage{subcaption} % Subfigures and side-by-side captions.
\RequirePackage{tabularx} % Flexible-width tables.
\RequirePackage{xltabular} % Same as tabularx but to be used in long tables.
\RequirePackage{booktabs} % Professional table styling.
\RequirePackage{multirow} % Support for multirow cells in tables.
\RequirePackage{longtable} % Tables spanning multiple pages.
\RequirePackage{caption} % Customisation of captions.
\RequirePackage{enumitem} % Customisation of lists.
\RequirePackage{amsmath} % Advanced mathematical expressions.
\RequirePackage{amssymb} % Extended mathematical symbols.
\RequirePackage[dvipsnames]{xcolor} % Extended color support.
\RequirePackage{tcolorbox} % Creating colored and highlighted boxes.
\RequirePackage{varwidth} % Allows variable-width boxes.
\RequirePackage{titlesec} % Customisation of section and chapter titles.
\RequirePackage{titling} % Control over title and titlepage formatting.
\RequirePackage[toc,page]{appendix} % Formatting for appendices.
\RequirePackage[acronym]{glossaries} % Create glossaries and acronyms.
\RequirePackage[calc,datesep={/}]{datetime2} % Enhanced date and time formatting.
\RequirePackage[bookmarks,pdfusetitle]{hyperref} % Hyperlinks and PDF metadata.
\RequirePackage{xparse} % Advanced argument parsing for custom macros.
\RequirePackage{typearea} % Page layout adjustments (KOMA-Script).
\RequirePackage{eso-pic} % Adding elements to the page background.
\RequirePackage{setspace} % Adjust line spacing.
\RequirePackage[newfloat]{minted2} % Syntax highlighting for code.
\RequirePackage{silence} % Suppress specific package warnings.
\RequirePackage{fontawesome5} % Font awesome icons.
\RequirePackage{calc} % Infix notation arithmetic.
\RequirePackage{contour} % Countour words in a given color.
\RequirePackage[normalem]{ulem} % A better underline.
\RequirePackage{mfirstuc} % Capitalise words in a sentence.
\RequirePackage{blindtext} % Generate placeholder text.
\RequirePackage{ragged2e}
\RequirePackage{array} % Generate dummy text.



\tcbuselibrary{most} % Load most libraries from the tcolorbox package.
\WarningsOff[blindtext] % Suppress warnings from the blindtext package.

%%% Import Configurations - Maintain the Specified Order! %%%
\usepackage{Configurations/00-Fonts}
\usepackage{Configurations/01-Colors}
\usepackage{Configurations/02-Margins}
\usepackage{Configurations/03-References}
\usepackage{Configurations/04-Headers}
\usepackage{Configurations/05-Contents}
\usepackage{Configurations/06-Glossary}
\usepackage{Configurations/07-Chapters}
\usepackage{Configurations/08-Tables}
\usepackage{Configurations/09-Code}
\usepackage{Configurations/10-Macros}
\usepackage{Configurations/11-Metadata}