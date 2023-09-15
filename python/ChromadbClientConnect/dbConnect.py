import chromadb
from chromadb.config import Settings

connector = chromadb.Client(Settings(chroma_api_impl="rest",
                                     chroma_server_host="18.236.87.231",
                                     chroma_server_http_port="8000"
                                     ))

try:
    collection = connector.get_or_create_collection("dockerCollection")
except Exception as e:
    print(e.args)


try:
    collection.add(
        documents=["lorem ipsum...", "doc2", "doc3"],
        metadatas=[{"chapter": "3", "verse": "16"}, {"chapter": "3",
                                                     "verse": "5"}, {"chapter": "29", "verse": "11"}],
        ids=["id1", "id2", "id3"]
    )
except Exception as err:
    print(collection.query(
        query_texts="lorem",
        n_results=1,
    ))
    print(err.args)
