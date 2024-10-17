import requests
import json
import os

# Constants
API_KEY = '6b032ee095d90e9aa6cc54e276892667'
BASE_URL = 'https://api.themoviedb.org/3'
FAVORITES_FILE = 'favorites.json'

# Function to load favorites from a JSON file
def load_favorites():
    if os.path.exists(FAVORITES_FILE):
        with open(FAVORITES_FILE, 'r') as file:
            return json.load(file)
    return []

# Function to save favorites to a JSON file
def save_favorites(favorites):
    with open(FAVORITES_FILE, 'w') as file:
        json.dump(favorites, file)

# Function to search for a movie
def search_movie(movie_name):
    url = f"{BASE_URL}/search/movie?api_key={API_KEY}&query={movie_name}"
    response = requests.get(url)
    
    if response.status_code == 200:
        results = response.json().get('results', [])
        if results:
            return results[0]  # Return the first result
        else:
            print("No results found.")
            return None
    else:
        print("Error fetching data from TMDb API.")
        return None

# Function to display movie details
def display_movie_details(movie):
    print(f"\nTitle: {movie['title']}")
    print(f"Release Date: {movie['release_date']}")
    print(f"Rating: {movie['vote_average']}/10")
    print(f"Overview: {movie['overview']}\n")
    
# Function to manage favorites
def manage_favorites(favorites, movie):
    action = input("Would you like to add this movie to your favorites? (yes/no): ").strip().lower()
    
    if action == 'yes':
        if movie not in favorites:
            favorites.append(movie)
            save_favorites(favorites)
            print(f"{movie['title']} added to favorites.")
        else:
            print(f"{movie['title']} is already in favorites.")
    elif action == 'no':
        print("Movie not added to favorites.")
    else:
        print("Invalid input. Please enter 'yes' or 'no'.")

# Main function to run the app
def main():
    favorites = load_favorites()
    print("Welcome to the Movie Search App!")
    
    while True:
        print("\nMenu:")
        print("1. Search for a movie")
        print("2. View favorites")
        print("3. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == '1':
            movie_name = input("Enter the movie name: ")
            movie = search_movie(movie_name)
            if movie:
                display_movie_details(movie)
                manage_favorites(favorites, movie)
        
        elif choice == '2':
            print("\nFavorite Movies:")
            for favorite in favorites:
                print(f"- {favorite['title']}")
        
        elif choice == '3':
            print("Exiting the app. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == '__main__':
    main()
