QUEST_HEROBIL_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001517',
	character = 'MaFl_Segho',
	end_character = 'MaDa_Fera',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HEROBIL_TRN3',
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
			{ id = 'II_SYS_SYS_QUE_MPOSTERSKILL', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_STEAMWALKER2', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_MPOSTERSKILL', monster_id = 'MI_STEAMWALKER2', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001518',
			'IDS_PROPQUEST_INC_001519',
			'IDS_PROPQUEST_INC_001520',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001521',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001522',
		},
		completed = {
			'IDS_PROPQUEST_INC_001523',
			'IDS_PROPQUEST_INC_001524',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001525',
		},
	}
}
