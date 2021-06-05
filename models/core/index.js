const conn = require('../../database/connection')
const { ValueString } = require('../../function')

module.exports = class Model {
  constructor(args) {
    const entity = args || {}
    this.selectQuery = '*'
    this.whereQuery = []
    this.sortType = []
    this.distinct = false
  }

  reset() {
    this.selectQuery = '*'
    this.whereQuery = []
    this.sortType = []
    this.distinct = false
  }

  select(columns) {
    this.selectQuery = columns ? columns.join(',') : '*'
    return this
  }

  where(key, param1, param2) {
    if (param2 !== undefined && !['=', '>', '<', '>=', '<=', 'LIKE', 'IN'].includes(param1)) {
      throw new Error('The operator rules put in are illegal.')
    }
    const query = {
      key,
      operator: param2 === undefined ? '=' : param1,
      value: ValueString(param2 === undefined ? param1 : param2, 'sql'),
      type: 'WHERE',
    }
    if (this.whereQuery.length === 0) {
      this.whereQuery = [query]
    } else {
      query.type = 'AND'
      this.whereQuery.push(query)
    }
    return this
  }
  orWhere(key, param1, param2) {
    if (!['=', '>', '<', '>=', '<=', 'LIKE', 'IN'].includes(param1)) {
      throw new Error('The operator rules put in are illegal.')
    }
    const query = {
      key,
      operator: param2 === undefined ? '=' : param1,
      value: ValueString(param2 === undefined ? param1 : param2, 'sql'),
      type: 'WHERE',
    }
    if (this.whereQuery.length === 0) {
      this.whereQuery = [query]
    } else {
      query.type = 'OR'
      this.whereQuery.push(query)
    }
    return this
  }

  sort(key, sort) {
    this.sortType.push({
      key,
      sort: sort.toUpperCase() === 'DESC' || sort === true ? 'DESC' : 'ASC',
    })
    return this
  }

  selectSqlQuery() {
    const sqlQuery = `
SELECT${this.distinct ? ' DISTINCT' : ''} ${this.selectQuery} FROM ${this.table} ${this.whereQuery
      .map(where => `${where.type} ${where.key} ${where.operator} ${where.value}`)
      .join(' \n')}${
      this.sortType.length ? `ORDER BY ${this.sortType.map(s => `${s.key} ${s.sort}`).join(', ')}` : ''
    };`
    console.log('sqlQuery: '.green, sqlQuery)
    return new Promise((resolve, reject) => {
      conn.query(sqlQuery, (error, result) => {
        if (error) {
          reject(error)
        } else {
          if (result) {
            resolve(result)
          } else {
            resolve([])
          }
        }
      })
    })
  }

  async get() {
    return await this.selectSqlQuery()
  }

  create(data) {
    const insertData = {}
    this.fillable.forEach(key => {
      insertData[key] = data[key]
    })
    return new Promise((resolve, reject) => {
      const sqlQuery = `
INSERT INTO MyGuests (${Object.keys(insertData)
        .map(key => key)
        .join(',')})
VALUES (${Object.keys(insertData)
        .map(key => typeFormat(insertData[key]))
        .join(',')})`
      conn.connect()
      conn
        .query(sqlQuery)
        .on('result', result => {
          resolve(result)
          conn.end()
        })
        .on('error', error => {
          reject(error)
          conn.end()
        })
    })
  }

  query(sqlQuery) {
    return new Promise((resolve, reject) => {
      conn.query(sqlQuery, (error, result, fields) => {
        if (error) return reject(error)
        if (fields) return resolve([])
        resolve(result)
      })
    })
  }
}
