QUEST_HERORIN_TRN5 = {
	title = 'IDS_PROPQUEST_INC_001587',
	character = 'MaDa_Heedan',
	end_character = 'MaDa_Romvoette',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HERORIN_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_VENHEART', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GUARDMON1', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_VENHEART', monster_id = 'MI_GUARDMON1', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001588',
			'IDS_PROPQUEST_INC_001589',
			'IDS_PROPQUEST_INC_001590',
			'IDS_PROPQUEST_INC_001591',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001592',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001593',
		},
		completed = {
			'IDS_PROPQUEST_INC_001594',
			'IDS_PROPQUEST_INC_001595',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001596',
		},
	}
}
