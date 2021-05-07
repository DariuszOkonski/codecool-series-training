from flask import Flask, render_template, url_for, redirect, request, jsonify
from data import queries
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')
SHOWS_PER_PAGE = 15
SHOWN_PAGE_NUMBERS = 5 # should be odd to have a symmetry in pagination

@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/')
@app.route('/shows/<int:page_number>')
@app.route('/shows/most-rated/')
@app.route('/shows/most-rated/<int:page_number>')
@app.route('/shows/order-by-<order_by>/')
@app.route('/shows/order-by-<order_by>-<order>/')
@app.route('/shows/order-by-<order_by>/<int:page_number>')
@app.route('/shows/order-by-<order_by>-<order>/<int:page_number>')
def shows(page_number=1, order_by="rating", order="DESC"):
    count = queries.get_show_count()
    pages_count = math.ceil(count[0]['count'] / SHOWS_PER_PAGE)
    shows = queries.get_shows_limited(order_by, order, SHOWS_PER_PAGE, (page_number - 1) * SHOWS_PER_PAGE)

    shown_pages_start = int(page_number - ((SHOWN_PAGE_NUMBERS - 1) / 2))
    shown_pages_end = int(page_number + ((SHOWN_PAGE_NUMBERS - 1) / 2))
    if shown_pages_start < 1:
        shown_pages_start = 1
        shown_pages_end = SHOWN_PAGE_NUMBERS
    elif shown_pages_end > pages_count:
        shown_pages_start = pages_count - SHOWN_PAGE_NUMBERS + 1
        shown_pages_end = pages_count

    return render_template(
        'shows.html',
        shows=shows,
        pages_count=pages_count,
        page_number=page_number,
        shown_pages_start=shown_pages_start,
        shown_pages_end=shown_pages_end,
        order_by=order_by,
        order=order
    )


@app.route('/show/<int:id>/')
def show(id):
    show = queries.get_show(id)
    characters = queries.get_show_characters(id, 3)
    seasons = queries.get_show_seasons(id)

    # format character names
    show['characters_str'] = \
        ', '.join([character['name'] for character in characters])

    # getting trailer id from URL to embed video
    show['trailer_id'] = \
        show['trailer'][show['trailer'].find('=')+1:] if show['trailer'] else ''

    # format runtime
    hours, minutes = divmod(show['runtime'], 60)
    runtime_str = (str(hours)+'h ' if hours else '') + (str(minutes)+'min' if minutes else '')
    show['runtime_str'] = runtime_str

    return render_template('show.html', show=show, seasons=seasons)

# ==============================================================

@app.route('/show-genres')
def show_genres():
    return render_template('show_genres.html')

@app.route('/get-genres')
def get_genres():
    genres = queries.get_genres()
    return jsonify(genres)

@app.route('/insert-genre', methods=['POST'])
def insert_genre():
    genre = request.get_json()
    response = queries.insert_genre(genre['name'])

    return jsonify(response)


@app.route('/update-genre', methods=['POST'])
def update_genre():
    genre_data = request.get_json()
    id = genre_data['id']
    name = genre_data['name']
    response = queries.update_genre(id, name)

    return jsonify(response)


@app.route('/delete-genre', methods=['POST'])
def delete_genre():
    print(request.get_json(), ' json')
    queries.delete_genre(request.get_json()['id'])
    return jsonify("")




# ============================================================
# @app.route('/show-genres')
# def show_genres():
#     genres = queries.get_genres()
#
#     return render_template('show_genres.html', genres=genres)
# @app.route('/insert-genre', methods=['GET'])
# def insert_genre():
#
#     return render_template('insert_genre.html')
#
# @app.route('/insert-genre', methods=['POST'])
# def post_insert_genre():
#     name = request.form.get('name')
#     queries.insert_genre(name)
#
#     return redirect(url_for('show_genres'))
#
# @app.route('/update-genre/<int:id>', methods=['GET'])
# def update_genre(id: int):
#     genre = queries.get_genre(id)[0]
#
#     return render_template('update_genre.html', genre=genre)
#
# @app.route('/update-genre/<int:id>', methods=['POST'])
# def post_update_genre(id: int):
#     queries.update_genre(id, request.form['name'])
#
#     return redirect(url_for('show_genres'))
#
# @app.route('/delete-genre/<int:id>', methods=['GET'])
# def delete_genre(id: int):
#     queries.delete_genre(id)
#
#     return redirect(url_for('show_genres'))
# ============================================================

def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
