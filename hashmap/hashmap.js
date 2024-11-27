class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 8) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    let hashCode = 0;
    for (let char of key) {
      hashCode = (31 * hashCode + char.charCodeAt(0)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let entry of bucket) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let entry of bucket) {
      if (entry[0] === key) return entry[1];
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let entry of bucket) {
      if (entry[0] === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
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

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
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

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    return this.buckets.flat().map(([key]) => key);
  }

  values() {
    return this.buckets.flat().map(([, value]) => value);
  }

  entries() {
    return this.buckets.flat().map(([key, value]) => ({ key, value }));
  }
}
