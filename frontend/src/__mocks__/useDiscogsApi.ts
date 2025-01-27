import { vi } from 'vitest'

vi.mock('useDiscogsApi', async() => {
  return {
    database_search: () => {
      return {
        isLoading:false,
        error:null,
        data: {
          "pagination": {
            "page": 1,
            "pages": 58,
            "per_page": 50,
            "items": 2877,
          },
          "results": [
            {
                "country": "Canada",
                "year": "2024",
                "format": [
                    "CD",
                    "Album"
                ],
                "label": [
                    "People of Punk Rock Records"
                ],
                "type": "release",
                "genre": [
                    "Rock"
                ],
                "style": [
                    "Punk"
                ],
                "id": 30036838,
                "barcode": [
                    "012345000638"
                ],
                "master_id": 0,
                "master_url": null,
                "uri": "/release/30036838-Down-Memory-Lane-Breathing-Space",
                "catno": "POPR-063",
                "title": "Down Memory Lane - Breathing Space",
                "thumb": "https://i.discogs.com/zLWZv8XJTDqljFuUJJvknSpDfqQifHCQJ9xVhfcHnIo/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMwMDM2/ODM4LTE3MDk5MDMy/OTQtMzY4My5qcGVn.jpeg",
                "cover_image": "https://i.discogs.com/y4U0YNHluoKZjaOH_oTa3cyjsihjw3n0na-XI4az_xw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMwMDM2/ODM4LTE3MDk5MDMy/OTQtMzY4My5qcGVn.jpeg",
                "resource_url": "https://api.discogs.com/releases/30036838",
                "community": {
                    "want": 0,
                    "have": 11
                },
                "format_quantity": 1,
                "formats": [
                    {
                        "name": "CD",
                        "qty": "1",
                        "descriptions": [
                            "Album"
                        ]
                    }
                ]
            },
            {
                "country": "Canada",
                "year": "2024",
                "format": [
                    "CD",
                    "Album"
                ],
                "label": [
                    "Audiogram",
                    "Les Disques Audiogramme inc.",
                    "Les Disques Audiogramme inc."
                ],
                "type": "release",
                "genre": [
                    "Pop",
                    "Folk, World, & Country"
                ],
                "style": [
                    "Chanson"
                ],
                "id": 29980804,
                "barcode": [
                    "197188818395"
                ],
                "master_id": 3484102,
                "master_url": "https://api.discogs.com/masters/3484102",
                "uri": "/release/29980804-Beyries-Du-Feu-Dans-Les-Lilas",
                "catno": "AD10502",
                "title": "Beyries - Du Feu Dans Les Lilas",
                "thumb": "https://i.discogs.com/YhI_KAix3Ige69T0SstltRkgocwDfvliJaUwJxStEYs/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5OTgw/ODA0LTE3MzEyOTIz/NzItNzk4MS5qcGVn.jpeg",
                "cover_image": "https://i.discogs.com/jNg_V4Vfql7ttorQ-RHReqIP1FCn0V70y-YilqDd594/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5OTgw/ODA0LTE3MzEyOTIz/NzItNzk4MS5qcGVn.jpeg",
                "resource_url": "https://api.discogs.com/releases/29980804",
                "community": {
                    "want": 0,
                    "have": 4
                },
                "format_quantity": 1,
                "formats": [
                    {
                        "name": "CD",
                        "qty": "1",
                        "descriptions": [
                            "Album"
                        ]
                    }
                ]
            },
          ]
        },
      }
    }
  }
})