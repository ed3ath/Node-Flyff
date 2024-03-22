QUEST_SPECHILD = {
	title = 'IDS_PROPQUEST_INC_001096',
	character = 'MaSa_Porgo',
	end_character = 'MaSa_Porgo',
	start_requirements = {
		min_level = 20,
		max_level = 40,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_TRUTH_PAST',
	},
	rewards = {
		gold = 0,
		exp = 5758,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MIAREPORT', quantity = 22, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_MIA2', quantity = 7 },
			{ id = 'MI_MIA3', quantity = 5 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_MIAREPORT', monster_id = 'MI_MIA2', probability = '1800000000' },
		{ item_id = 'II_SYS_SYS_QUE_MIAREPORT', monster_id = 'MI_MIA3', probability = '2100000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001097',
			'IDS_PROPQUEST_INC_001098',
			'IDS_PROPQUEST_INC_001099',
			'IDS_PROPQUEST_INC_001100',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001101',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001102',
		},
		completed = {
			'IDS_PROPQUEST_INC_001103',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001104',
		},
	}
}
