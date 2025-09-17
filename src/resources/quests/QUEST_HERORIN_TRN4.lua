QUEST_HERORIN_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001575',
	character = 'MaFl_Teshar',
	end_character = 'MaDa_Heedan',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HERORIN_TRN3',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROMARK', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_DEWEIEN', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_HUNTERX', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_DEWEIEN', monster_id = 'MI_HUNTERX', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001576',
			'IDS_PROPQUEST_INC_001577',
			'IDS_PROPQUEST_INC_001578',
			'IDS_PROPQUEST_INC_001579',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001580',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001581',
		},
		completed = {
			'IDS_PROPQUEST_INC_001582',
			'IDS_PROPQUEST_INC_001583',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001584',
		},
	}
}
