from django.shortcuts import render

import requests
from django.http import JsonResponse

def fetch_movies(request):
    # API key 
    api_key = 'LMzwGLuzv9hMVLRSpVrfHLcPJrhWxTWN0eJmYATT'
    
    # Extract filters from request (e.g., genres, services)
    selected_genres = request.GET.get('genres', '')
    selected_services = request.GET.get('source_ids', '')

    
    # Construct the API request URL and parameters
    api_url = 'https://api.watchmode.com/v1/list-titles/'
    params = {
        'apiKey': api_key,
        'genres': selected_genres,
        'source_ids': selected_services
    }

    print(f"Requested Genres: {selected_genres}")
    print(f"Requested Services: {selected_services}")
    print(f"API Request URL: {response.url}")  # This will show the final URL after parameters are added


    
    # Make the request to the Watchmode API
    response = requests.get(api_url, params=params)
    
    if response.status_code == 200:
        # Process the response - this will depend on the structure of the response
        data = response.json()
        processed_data = data  # Modify as needed based on how you want to process the data
        
        # Return the processed data as JSON
        return JsonResponse({'movies': processed_data})
    else:
        # Handle error responses
        return JsonResponse({'error': 'Failed to fetch data from Watchmode API'}, status=response.status_code) 
    