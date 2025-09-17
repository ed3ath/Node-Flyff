QUEST_PHANTASM = {
	title = 'IDS_PROPQUEST_INC_001721',
	character = 'MaFl_DrEstly',
	end_character = 'MaFl_DrEstly',
	start_requirements = {
		min_level = 20,
		max_level = 35,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_SUMMONDARK',
	},
	rewards = {
		gold = 0,
		exp = 2060,
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_DUFEFERN2', quantity = 1 },
			{ id = 'MI_DUNYANGNYANG2', quantity = 1 },
		},
		patrols = {
			{ map = 'WI_DUNGEON_FL_MAS', left = 1085, top = 1049, right = 1134, bottom = 993 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001722',
			'IDS_PROPQUEST_INC_001723',
			'IDS_PROPQUEST_INC_001724',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001725',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001726',
		},
		completed = {
			'IDS_PROPQUEST_INC_001727',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001728',
		},
	}
}
