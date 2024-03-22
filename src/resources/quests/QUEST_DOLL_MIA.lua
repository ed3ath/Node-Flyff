QUEST_DOLL_MIA = {
	title = 'IDS_PROPQUEST_INC_001038',
	character = 'MaSa_Porgo',
	end_character = 'MaSa_JeongHwa',
	start_requirements = {
		min_level = 20,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_TRUTH_MIA',
	},
	rewards = {
		gold = 0,
		exp = 2076,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_JINDOLL', quantity = 1, sex = 'Any', remove = true },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_JINDOLL', monster_id = 'MI_MIA1', probability = '800000000' },
		{ item_id = 'II_SYS_SYS_QUE_JINDOLL', monster_id = 'MI_MIA2', probability = '700000000' },
		{ item_id = 'II_SYS_SYS_QUE_JINDOLL', monster_id = 'MI_MIA3', probability = '650000000' },
		{ item_id = 'II_SYS_SYS_QUE_JINDOLL', monster_id = 'MI_MIA4', probability = '600000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001039',
			'IDS_PROPQUEST_INC_001040',
			'IDS_PROPQUEST_INC_001041',
			'IDS_PROPQUEST_INC_001042',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001043',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001044',
		},
		completed = {
			'IDS_PROPQUEST_INC_001045',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001046',
		},
	}
}
