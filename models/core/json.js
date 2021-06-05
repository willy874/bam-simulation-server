const fs = require('fs')
const path = require('path')

/**
 * @param {String} table
 * @param {Array<String>} fillable
 * @param {String} primaryKey
 * @param {__proto__} primaryKeyType
 * @param {String} deleteKey
 * @param {Collection<Function>} middlewaru7e
 */

module.exports = class Model {
	constructor(ops) {
		this.table = ops.table
		this.fillable = ops.fillable
		this.primaryKey = ops.primaryKey || 'id'
		this.primaryKeyType = ops.primaryKeyType || Number
		this.deleteKey = ops.deleteKey || 'deleted_at'
		this.middleware = ops.middleware && {
			getDB: ops.middleware.getDB || undefined,
			getTable: ops.middleware.getTable || undefined,
			setTable: ops.middleware.addTable || undefined,
		} || {}
		this.deleteRules = (db) => db.filter(p => !p[this.deleteKey])
		this.whereRules = [[this.deleteRules]]
		this.whereRulesLength = 1
		this.getIndex = 0
		this.path = path.resolve(__dirname,'..','..','db',`${this.table}.json`)
	}
	where(key, param1, param2) {
		let rule, data
		if ((['=', '==', '===', '>', '<', '>=', '<=', 'like'].includes(param1)) || param1 instanceof RegExp) {
			rule = param1
			data = param2
		} else {
			rule = '='
			data = param1
		}
		this.whereRules[this.whereRulesLength - 1].push(
			(DB) => {
				return DB.filter(row => {
					if (rule === '=' || rule === '==') {
						return row[key] == data
					} else if (rule === '===') {
						return row[key] === data
					} else if (rule === '<') {
						return row[key] < data
					} else if (rule === '>') {
						return row[key] > data
					} else if (rule === '<=') {
						return row[key] <= data
					} else if (rule === '>=') {
						return row[key] >= data
					} else if (rule === 'like') {
						return new RegExp(data).test(row[key])
					} else if (rule instanceof RegExp) {
						return rule.test(row[key])
					} else {
						return row[key] == data
					}
				})
			}
		)
		return this
	}
	orWhere(key, param1, param2) {
		this.whereRulesLength = this.whereRules.push([this.deleteRules])
		return this.where(key, param1, param2)
	}
	all() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, (err, data) => {
				if (err) reject(err)
				const db = JSON.parse(data.toString())
				resolve(db)
			})
		})
	}
	get() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, (err, data) => {
				if (err) reject(err)
				const db = JSON.parse(data.toString())
				if (this.whereRules.length) {
					const response = this.whereRules.map(rules => {
						return rules.reduce((val, where) => where(val), db)
					}).find(p => p.length)
					resolve(response || [])
				} else {
					resolve(db)
				}
			})
		})
	}
	/**
	 * @param {Number} ops.page 取得的頁數次序
	 * @param {Number} ops.per 取得每頁的最大筆數
	 * @param {String} ops.sort 取資料使用的排序優先規則
	 */
	pagination(ops){
		return new Promise((resolve, reject) => {
			this.get().then(data => {
				const currentPage = Number(ops.page) || 1
				const perPage = Number(ops.per) || 10
				const total = data.length
				const last = Math.ceil(total/perPage)
				const list = {
						data: [],
						current_page: currentPage,
						per_page: perPage,
						last_page: last,
						total,
				}
				if (ops.sort) {
					data.sort((a, b) => {
						const nameA = a[ops.sort].toUpperCase()
						const nameB = b[ops.sort].toUpperCase()
						if (nameA < nameB) return -1
						if (nameA > nameB) return 1
						return 0
					})
				}
				if (currentPage <= last) {
					list.data = data.filter((p,i)=>(currentPage-1)*perPage <= i && i < currentPage*perPage)
				} else {
					list.data = data[last - 1]
				}
				resolve(list)
			}).catch((err) => reject(err))
		})
	}
	add() { }
	update() { }
	delete() { }
}