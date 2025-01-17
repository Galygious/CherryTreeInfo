// File: src/tableGenerator.js

const DATA_SOURCES = {
    items: items,
    bows: bows,
    arrows: arrows,
    tableList: tableList
  };
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function parseForSorting(value) {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num;
    }
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value || 0;
  }
  
  const TABLE_CONFIGS = {
    default: {
      dataSource: {
        source: 'items',
        filter: (item, type) => {
          // Replaced optional chaining with a safe check
          const hasEquipment = item.type && item.type.includes('Equipment-');
          const itemType = hasEquipment
            ? item.type.split('Equipment-')[1]
            : item.type;
  
          return (
            itemType &&
            itemType.toLowerCase() === type.toLowerCase() &&
            !TABLE_CONFIGS[itemType.toLowerCase()]
          );
        }
      },
      columns: [
        {
          header: 'Item',
          width: '25%',
          source: 'items',
          field: 'name',
          render: (item) => `
            <div class="item-container font-medium w-full">
                <img src="drawable/${item.icon}.png" alt="${item.name}" class="w-12 h-12 mr-2">
                <div align="center" class="text-center w-full">
                    ${item.name}
                    ${
                      item.rarity !== 'Common' 
                        ? `<div class="ml-2 text-sm text-gray-500">(${item.rarity})</div>` 
                        : ''
                    }
                </div>
            </div>
          `
        },
        {
          header: 'Attack',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'attackBonus'
        },
        {
          header: 'Strength',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'strengthBonus'
        },
        {
          header: 'Defence',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'defenceBonus'
        },
        {
          header: 'Health',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'healthBonus'
        },
        {
          header: 'Details',
          width: '33%',
          source: 'items',
          domSortSelector: '.sortval',
          render: (item) => {
            const numericValue = parseInt(item.value) || 0;
            return `
              <div>
                ${
                  item.description && item.description !== 'null' 
                    ? `<span class="text-gray-300">
                        ${item.description}
                       </span>`
                    : ''
                }
                ${
                  numericValue > 0 
                    ? `<div class="text-sm text-gray-500">
                         Value: 
                         <span 
                            class="sortval" 
                            data-sort-val="${numericValue}"
                         >
                            ${formatNumber(numericValue)}
                         </span>
                       </div>` 
                    : ''
                }
              </div>
            `;
          }
        }
      ]
    },
    weapon: {
      dataSource: {
        source: 'items',
        filter: (item) => {
          if (item.type && item.type.toLowerCase().includes('equipment-weapon')) {
            const isBow = bows.some(b => b.name === item.name);
            return !isBow;
          }
          return false;
        }
      },
      columns: [
        {
          header: 'Item',
          width: '25%',
          source: 'items',
          field: 'name',
          render: (item) => `
            <div class="item-container font-medium w-full">
                <img src="drawable/${item.icon}.png" alt="${item.name}" class="w-12 h-12 mr-2">
                <div align="center" class="text-center w-full">
                    ${item.name}
                    ${
                      item.rarity !== 'Common' 
                        ? `<div class="ml-2 text-sm text-gray-500">(${item.rarity})</div>` 
                        : ''
                    }
                </div>
            </div>
          `
        },
        {
          header: 'Attack',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'attackBonus'
        },
        {
          header: 'Strength',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'strengthBonus'
        },
        {
          header: 'Defence',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'defenceBonus'
        },
        {
          header: 'Health',
          width: '8%',
          align: 'center',
          source: 'items',
          field: 'healthBonus'
        },
        {
          header: 'Details',
          width: '33%',
          source: 'items',
          domSortSelector: '.sortval',
          render: (item) => {
            const numericValue = parseInt(item.value) || 0;
            return `
              ${
                item.description && item.description !== 'null' 
                  ? `<span class="text-gray-300">
                      ${item.description}
                     </span>`
                  : ''
              }
              <div>
                ${
                  numericValue > 0 
                    ? `<div class="text-sm text-gray-500">
                         Value: 
                         <span
                           class="sortval" 
                           data-sort-val="${numericValue}"
                         >
                           ${formatNumber(numericValue)}
                         </span>
                       </div>` 
                    : ''
                }
              </div>
            `;
          }
        }
      ]
    },
    bow: {
      dataSource: {
        source: 'bows',
        filter: () => true
      },
      columns: [
        {
          header: 'Bow',
          width: '20%',
          source: 'items',
          render: (item) => `
            <div class="item-container font-medium w-full">
                <img src="drawable/${item.icon}.png" alt="${item.name}" class="w-12 h-12 mr-2">
                <div align="center" class="text-center w-full">
                    ${item.name}
                    ${
                      item.rarity !== 'Common' 
                        ? `<div class="ml-2 text-sm text-gray-500">(${item.rarity})</div>` 
                        : ''
                    }
                </div>
            </div>
          `
        },
        {
          header: 'Speed',
          width: '20%',
          align: 'center',
          source: 'bows',
          field: 'speed'
        },
        {
          header: 'Damage',
          width: '20%',
          align: 'center',
          source: 'bows',
          field: 'damage'
        },
        {
          header: 'Accuracy',
          width: '20%',
          align: 'center',
          source: 'bows',
          field: 'accuracy'
        },
        {
          header: 'Crit Chance',
          width: '20%',
          align: 'center',
          source: 'bows',
          field: 'critChance'
        }
      ]
    },
    arrows: {
      dataSource: {
        source: 'arrows',
        filter: () => true
      },
      columns: [
        {
          header: 'Arrows',
          width: '33%',
          source: 'items',
          render: (item) => `
            <div class="item-container font-medium w-full">
                <img src="drawable/${item.icon}.png" alt="${item.name}" class="w-12 h-12 mr-2">
                <div align="center" class="text-center w-full">
                    ${item.name}
                    ${
                      item.rarity !== 'Common' 
                        ? `<div class="ml-2 text-sm text-gray-500">(${item.rarity})</div>` 
                        : ''
                    }
                </div>
            </div>
          `
        },
        {
          header: 'Damage',
          width: '33%',
          align: 'center',
          source: 'arrows',
          field: 'damage'
        },
        {
          header: 'Details',
          width: '33%',
          source: 'items',
          domSortSelector: '.sortval',
          render: (item) => {
            const numericValue = parseInt(item.value) || 0;
            return `
              ${
                item.description && item.description !== 'null' 
                  ? `<span class="text-gray-300">
                       ${item.description}
                     </span>`
                  : ''
              }
              <div>
                ${
                  numericValue > 0 
                    ? `<div class="text-sm text-gray-500">
                         Value: 
                         <span
                           class="sortval" 
                           data-sort-val="${numericValue}"
                         >
                           ${formatNumber(numericValue)}
                         </span>
                       </div>` 
                    : ''
                }
              </div>
            `;
          }
        }
      ]
    }
  };
  
  class TableGenerator {
    constructor() {
      this.sortStates = {};
    }
  
    getFilteredData(config, type) {
      const ds = config.dataSource;
      if (!ds || !DATA_SOURCES[ds.source]) return [];
      const baseItems = DATA_SOURCES[ds.source];
      if (typeof ds.filter === 'function') {
        return baseItems.filter(item => ds.filter(item, type));
      }
      return baseItems;
    }
  
    getSortedData(data, config, sortState, tableElement) {
      if (sortState.column === -1) return data;
      const columnDef = config.columns[sortState.column];
      if (!columnDef) return data;
  
      // Field-based sorting
      if (columnDef.field && !columnDef.domSortSelector) {
        return [...data].sort((a, b) => {
          const aValue = parseForSorting(a[columnDef.field]);
          const bValue = parseForSorting(b[columnDef.field]);
          if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
  
      // DOM-based sorting (for custom render)
      if (columnDef.domSortSelector && tableElement) {
        const rows = Array.from(tableElement.querySelectorAll('tbody tr'));
        const combined = rows.map(row => {
          const cell = row.querySelectorAll('td')[sortState.column];
          if (!cell) {
            return { row, sortValue: '' };
          }
          let sortValue = '';
          const domEl = cell.querySelector(columnDef.domSortSelector);
          if (domEl) {
            const dataVal = domEl.getAttribute('data-sort-val');
            sortValue = dataVal
              ? parseForSorting(dataVal)
              : parseForSorting(domEl.textContent);
          }
          return { row, sortValue };
        });
  
        combined.sort((a, b) => {
          if (a.sortValue < b.sortValue) return sortState.direction === 'asc' ? -1 : 1;
          if (a.sortValue > b.sortValue) return sortState.direction === 'asc' ? 1 : -1;
          return 0;
        });
  
        const tbody = tableElement.querySelector('tbody');
        combined.forEach(item => tbody.appendChild(item.row));
        return combined.map(item => data[rows.indexOf(item.row)]);
      }
  
      return data;
    }
  
    generateTable(type) {
      const lowerType = type.toLowerCase();
      const config = TABLE_CONFIGS[lowerType] || TABLE_CONFIGS.default;
      const sortState = this.sortStates[lowerType] || { column: -1, direction: '' };
      this.sortStates[lowerType] = sortState;
  
      const filteredData = this.getFilteredData(config, lowerType);
  
      const tableWrapper = document.createElement('div');
      tableWrapper.className = 'table-responsive';
      const tableId = `${lowerType}-table`;
      tableWrapper.innerHTML = `
        <table class="w-full border-collapse" id="${tableId}">
          <thead>
            <tr class="bg-gray-50">
              ${this.generateHeaders(config, sortState)}
            </tr>
          </thead>
          <tbody>
            ${this.generateRows(config, filteredData, sortState)}
          </tbody>
        </table>
      `;
  
      this.attachSortHandlers(tableWrapper, lowerType, config);
      return tableWrapper;
    }
  
    generateHeaders(config, sortState) {
      return config.columns
        .map((column, index) => {
          let sortIndicator = '';
          if (sortState.column === index) {
            sortIndicator = sortState.direction === 'asc' ? ' ↑' : ' ↓';
          }
          return `
            <th class="p-3 text-left border cursor-pointer" style="width: ${column.width}">
              ${column.header}${sortIndicator}
            </th>
          `;
        })
        .join('');
    }
  
    generateRows(config, data, sortState) {
      const sorted = this.getSortedData(data, config, sortState, null);
      return sorted
        .map(item => {
          const rowCells = config.columns.map(col => {
            return this.generateCell(col, item, config);
          });
          return `<tr class="hover:bg-gray-50">${rowCells.join('')}</tr>`;
        })
        .join('');
    }
  
    generateCell(column, item, config) {
      if (column.source && column.source !== (config.dataSource?.source)) {
        const altSource = DATA_SOURCES[column.source];
        if (altSource) {
          const match = altSource.find(x => x.name === item.name);
          if (match) {
            item = match;
          }
        }
      }
  
      if (column.render) {
        return `<td class="p-3 border ${column.align === 'center' ? 'text-center' : ''}">
          ${column.render(item)}
        </td>`;
      }
      const value = column.field ? item[column.field] : item.name;
      return `<td class="p-3 border ${column.align === 'center' ? 'text-center' : ''}">
        ${typeof value === 'number' ? formatNumber(value) : (value ?? '')}
      </td>`;
    }
  
    attachSortHandlers(tableWrapper, type, config) {
      const table = tableWrapper.querySelector('table');
      const headers = table.querySelectorAll('th');
      headers.forEach((header, index) => {
        header.addEventListener('click', () => {
          this.handleSort(type, index);
          this.updateTableBody(tableWrapper, type, config);
          this.updateSortIndicators(tableWrapper, config, type);
        });
      });
    }
  
    handleSort(type, columnIndex) {
      if (!this.sortStates[type]) {
        this.sortStates[type] = { column: -1, direction: '' };
      }
      const st = this.sortStates[type];
      if (st.column === columnIndex) {
        if (st.direction === 'desc') {
          st.direction = 'asc';
        } else if (st.direction === 'asc') {
          st.column = -1;
          st.direction = '';
        }
      } else {
        st.column = columnIndex;
        st.direction = 'desc';
      }
    }
  
    updateTableBody(tableWrapper, type, config) {
      const table = tableWrapper.querySelector('table');
      const sortState = this.sortStates[type] || { column: -1, direction: '' };
      const filteredData = this.getFilteredData(config, type);
      const sortedData = this.getSortedData(filteredData, config, sortState, table);
      const columnDef = config.columns[sortState.column];
      if (columnDef && !columnDef.domSortSelector) {
        table.querySelector('tbody').innerHTML = sortedData
          .map(item => {
            const rowCells = config.columns.map(col => this.generateCell(col, item, config));
            return `<tr class="hover:bg-gray-50">${rowCells.join('')}</tr>`;
          })
          .join('');
      }
    }
  
    updateSortIndicators(tableWrapper, config, type) {
      const sortState = this.sortStates[type] || { column: -1, direction: '' };
      const table = tableWrapper.querySelector('table');
      const headers = table.querySelectorAll('th');
      headers.forEach((header, idx) => {
        let sortIndicator = '';
        if (sortState.column === idx) {
          sortIndicator = sortState.direction === 'asc' ? ' ↑' : ' ↓';
        }
        header.innerHTML = `${config.columns[idx].header}${sortIndicator}`;
      });
    }
  }
  
  const tableGen = new TableGenerator();
  
  function toggleSection(type) {
    const content = document.getElementById(`section-${type.toLowerCase()}-content`);
    const button = document.querySelector(`[data-section="${type}"]`);
    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded');
      button.classList.add('collapsed');
    } else {
      content.classList.add('expanded');
      button.classList.remove('collapsed');
    }
  }
  
  String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  function populateTables() {
    const container = document.getElementById('sections');
    container.innerHTML = '';
    const specialTypes = new Set(Object.keys(TABLE_CONFIGS));
    const sections = new Map();
  
    items.forEach(item => {
      // Replaced optional chaining with a safe check
      const hasEquipment = item.type && item.type.includes('Equipment-');
      let itemType = hasEquipment
        ? item.type.split('Equipment-')[1]
        : item.type;
  
      if (itemType) {
        itemType = itemType.toLowerCase();
        if (!specialTypes.has(itemType) && !sections.has(itemType)) {
          sections.set(itemType, {
            type: itemType,
            config: TABLE_CONFIGS.default
          });
        }
      }
    });
  
    Object.keys(TABLE_CONFIGS).forEach(tKey => {
      if (tKey !== 'default') {
        sections.set(tKey.toLowerCase(), {
          type: tKey,
          config: TABLE_CONFIGS[tKey]
        });
      }
    });
  
    const sortedSections = Array.from(sections.values())
      .sort((a, b) => a.type.localeCompare(b.type));
  
    sortedSections.forEach(({ type, config }) => {
      const section = document.createElement('div');
      section.className = 'section';
  
      const button = document.createElement('button');
      button.className = 'section-button collapsed';
      button.onclick = () => toggleSection(type);
      button.setAttribute('data-section', type);
      button.textContent = type.toLowerCase() === 'null'
        ? 'Miscellaneous'
        : type.toTitleCase();
  
      const content = document.createElement('div');
      content.id = `section-${type.toLowerCase()}-content`;
      content.className = 'section-content';
  
      const table = tableGen.generateTable(type);
      content.appendChild(table);
  
      section.appendChild(button);
      section.appendChild(content);
      container.appendChild(section);
    });
  }
  
  document.addEventListener('DOMContentLoaded', populateTables);
  