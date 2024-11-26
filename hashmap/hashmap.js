class HashMap {
    constructor(initialCapacity = 4, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.size = 0;
      this.buckets = Array(this.capacity).fill(null).map(() => []);
    }
  
    _hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % this.capacity;
    }
  
    set(key, value) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return;
        }
      }
  
      bucket.push([key, value]);
      this.size++;
  
      if (this.size / this.capacity > this.loadFactor) {
        this._resize();
      }
    }
  
    get(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
  
      for (const [storedKey, value] of bucket) {
        if (storedKey === key) {
          return value;
        }
      }
  
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this._hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
      }
  
      return false;
    }
  
    _resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = Array(this.capacity).fill(null).map(() => []);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  
    length() {
      return this.size;
    }
  }
  
  const map = new HashMap();
  map.set("apple", "red");
  map.set("banana", "yellow");
  map.set("carrot", "orange");
  console.log(map.get("apple"));
  console.log(map.get("banana"));
  console.log(map.has("carrot"));
  console.log(map.has("grape"));
  console.log(map.remove("banana"));
  console.log(map.get("banana"));
  map.set("grape", "purple");
  map.set("dog", "brown");
  map.set("hat", "black");
  map.set("kite", "pink");
  console.log(map.get("kite"));
  console.log("Size:", map.length());
  