import textwrap


def wrap_content(content):
    content_as_string = str(content)
    words_in_content = content_as_string.split()
    first_word = words_in_content[0]

    if len(first_word) > 15:
        return f'{first_word}...' if len(words_in_content) > 1 else first_word
    return textwrap.shorten(content_as_string, width=18, placeholder='...')
