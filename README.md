# Demo

https://github.com/tomasciar/foodmaps/assets/81879857/e705a875-9094-493a-bfa9-a463674bc180

# Architecture

## Frontend
UI Components:
- Map and List Displays: View restaurant locations and scroll through a curated list of options.
- Search & Filter: Quickly find what you're looking for.
- Item Details: Get the scoop on each menu item, from ingredients to any current deals.

## Backend
The backend is responsible for processing and serving data to the frontend and comprises several distinct components.
- Controllers: Responsible for handling specific types of data operations.
- Web Scrapers: Automated tools periodically gather data from various sources to ensure the application's data remains current.
- Middleware: Components handle cross-origin requests and manage user sessions.
- Third-Party Integrations: The backend integrates with services for geolocation.

## Data Flow
1. Web scrapers collect and provide data to the backend.
2. This data is processed and stored in specific database collections.
3. The frontend requests data from the backend.
4. Backend controllers manage these requests, accessing the database to retrieve the necessary information and then returning the appropriate data to the frontend.

![IMG_1BBD88422BFA-1](https://user-images.githubusercontent.com/81879857/235369587-08d6d934-3f46-4b53-baa3-149f31f3316e.jpeg)


# Reflection

Reflecting on Foodmaps, it was a lot of fun, but it was a learning experience more than anything. The concept was good in theory, but many challenges made it hard to actually maintain/use in practice. The main problems were as follows:
- Scraping Reliability: Basically the main feature of Foodmaps is to collect food data by scraping, so the fact that web scraping is inherently unreliable means that it is a questionable business model. Maybe scraping will become more reliable with AI integrations but we will see.
- Data Overload: Mongo documents are relatively small in size, so I thought I would easily have enough storage to make this all work. I was totally wrong. I literally almost ran out of storage after like 3 days of the service running, which made it impossible to scale as I had planned because it was going to cost way too much money (way too much for me haha). I had to change the service to delete the old data after every scrape, but I initally had plans to sell/analyze the data, so this was a huge letdown.
- User Retention: The platform did offer "unique" value in some sense, but most users just completely stopped using the site after they understood the main idea of the strategy. My intention was to help others anyway, so this isn't really a big deal, but something to note going forward as I continue making these types of projects.
