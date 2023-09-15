import { expect, test } from "@jest/globals";
import { ChromaClient } from "../src/index";
import chroma from "./initClient";

test("it should create the client connection", async () => {
    expect(chroma).toBeDefined();
    expect(chroma).toBeInstanceOf(ChromaClient);
});

test("it should get the version", async () => {
    const version = await chroma.version();
    expect(version).toBeDefined();
    expect(version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
});

test("it should get the heartbeat", async () => {
    const heartbeat = await chroma.heartbeat();
    expect(heartbeat).toBeDefined();
    expect(heartbeat).toBeGreaterThan(0);
});

test("it should reset the database", async () => {
    await chroma.reset();
    const collections = await chroma.listCollections();
    expect(collections).toBeDefined();
    expect(collections).toBeInstanceOf(Array);
    expect(collections.length).toBe(0);

    const collection = await chroma.createCollection("test");
    const collections2 = await chroma.listCollections();
    expect(collections2).toBeDefined();
    expect(collections2).toBeInstanceOf(Array);
    expect(collections2.length).toBe(1);

    await chroma.reset();
    const collections3 = await chroma.listCollections();
    expect(collections3).toBeDefined();
    expect(collections3).toBeInstanceOf(Array);
    expect(collections3.length).toBe(0);
});

test('it should list collections', async () => {
    await chroma.reset()
    let collections = await chroma.listCollections()
    expect(collections).toBeDefined()
    expect(collections).toBeInstanceOf(Array)
    expect(collections.length).toBe(0)
    const collection = await chroma.createCollection('test')
    collections = await chroma.listCollections()
    expect(collections.length).toBe(1)
})

test('it should get a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const collection2 = await chroma.getCollection('test')
    expect(collection).toBeDefined()
    expect(collection2).toBeDefined()
    expect(collection).toHaveProperty('name')
    expect(collection2).toHaveProperty('name')
    expect(collection.name).toBe(collection2.name)
})

test('it should delete a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    let collections = await chroma.listCollections()
    expect(collections.length).toBe(1)
    var resp = await chroma.deleteCollection('test')
    collections = await chroma.listCollections()
    expect(collections.length).toBe(0)
})

test('it should add single embeddings to a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const id = 'test1'
    const embedding = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const metadata = { test: 'test' }
    await collection.add(id, embedding, metadata)
    const count = await collection.count()
    expect(count).toBe(1)
})

test('it should add batch embeddings to a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    await collection.add(ids, embeddings)
    const count = await collection.count()
    expect(count).toBe(3)
})

test('it should query a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    await collection.add(ids, embeddings)
    const results = await collection.query([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
    expect(results).toBeDefined()
    expect(results).toBeInstanceOf(Object)
    // expect(results.embeddings[0].length).toBe(2)
    expect(['test1', 'test2']).toEqual(expect.arrayContaining(results.ids[0]));
    expect(['test3']).not.toEqual(expect.arrayContaining(results.ids[0]));
})

test('it should peek a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    await collection.add(ids, embeddings)
    const results = await collection.peek(2)
    expect(results).toBeDefined()
    expect(results).toBeInstanceOf(Object)
    expect(results.ids.length).toBe(2)
    expect(['test1', 'test2']).toEqual(expect.arrayContaining(results.ids));
})

test('it should get a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    const metadatas = [{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }]
    await collection.add(ids, embeddings, metadatas)
    const results = await collection.get(['test1'])
    expect(results).toBeDefined()
    expect(results).toBeInstanceOf(Object)
    expect(results.ids.length).toBe(1)
    expect(['test1']).toEqual(expect.arrayContaining(results.ids));
    expect(['test2']).not.toEqual(expect.arrayContaining(results.ids));

    const results2 = await collection.get(undefined, { 'test': 'test1' })
    expect(results2).toBeDefined()
    expect(results2).toBeInstanceOf(Object)
    expect(results2.ids.length).toBe(1)
})

test('it should delete a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    const metadatas = [{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }]
    await collection.add(ids, embeddings, metadatas)
    let count = await collection.count()
    expect(count).toBe(3)
    var resp = await collection.delete(undefined, { 'test': 'test1' })
    count = await collection.count()
    expect(count).toBe(2)
})

test('wrong code returns an error', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection('test')
    const ids = ['test1', 'test2', 'test3']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    const metadatas = [{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }]
    await collection.add(ids, embeddings, metadatas)
    const results = await collection.get(undefined, { "test": { "$contains": "hello" } });
    expect(results.error).toBeDefined()
    expect(results.error).toBe("ValueError('Expected one of $gt, $lt, $gte, $lte, $ne, $eq, got $contains')")
})
